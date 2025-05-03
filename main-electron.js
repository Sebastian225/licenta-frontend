const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const url = require("url");
const path = require("path");
const fs = require('fs');
const {spawn} = require('child_process');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  })
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/client/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  //mainWindow.webContents.openDevTools()
  mainWindow.setMenuBarVisibility(false);
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

// IPC Channels

ipcMain.on('select-subject-file', (event) => {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  }).then(result => {
    // console.log(result.canceled)
    // console.log(result.filePaths)
    if (!result.canceled) {
      event.sender.send('select-subject-file', result.filePaths[0]);
    }
  }).catch(err => {
    console.log(err)
  })
});

ipcMain.on('select-structure-file', (event) => {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  }).then(result => {
    // console.log(result.canceled)
    // console.log(result.filePaths)
    if (!result.canceled) {
      event.sender.send('select-structure-file', result.filePaths[0]);
    }
  }).catch(err => {
    console.log(err)
  })
});

ipcMain.on('select-folder', (event) => {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }).then(result => {
    // console.log(result.canceled)
    // console.log(result.filePaths)
    if (!result.canceled) {
      event.sender.send('select-folder', result.filePaths[0]);
    }
  }).catch(err => {
    console.log(err)
  })
});

// COMMON

async function showConfirmationDialog() {
  const result = await dialog.showMessageBox(mainWindow, {
      type: 'question',
      buttons: ['Yes', 'No'],
      defaultId: 1,
      cancelId: 1,
      title: 'Confirm',
      message: 'There is already a file with the provided name. Are you sure you want to overwrite it?',
  });

  return result.response === 0; // 'Yes' is index 0
}

ipcMain.on('import-file', (event) => {
  dialog.showOpenDialog(mainWindow, {
    properties: ['openFile']
  }).then(result => {
    // console.log(result.canceled)
    // console.log(result.filePaths)
    if (!result.canceled) {
      const path = result.filePaths[0];

      fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        event.sender.send('import-file', {
          path: path,
          content: data
        });
      });
    }
  }).catch(err => {
    console.log(err)
  })
});

// STRUCTURE GENERATION

function writeStructureFile(fullPath, content) {
  try {
    fs.writeFileSync(fullPath, content, 'utf-8'); 
  }
  catch(e) { 
    dialog.showErrorBox("Error", "Could not save the structure");
    console.log(e);
  }
  finally {
    dialog.showMessageBox(mainWindow, {
      title: 'Done',
      message: 'Structure saved successfully!',
      type: 'info'
    })
  }
}

ipcMain.on('create-structure', (event, data) => {
  //console.log(data)
  if (!data.folder || !data.name) {
    dialog.showErrorBox("Error", "Please set a file name and a folder to save the structure in.");
  } else {
    const fullPath = data.folder + '\\' + data.name + '.txt';

    fs.access(fullPath, (err) => {
      if (err) {
        writeStructureFile(fullPath, data.content);
      } else {
        // confirm dialog to overwrite
        showConfirmationDialog().then((confirmed) => {
          if (confirmed) {
            writeStructureFile(fullPath, data.content);
          }
        });
      }
    });
  }
});

// SUBJECT GENERATION

function writeSubjectFile(fullPath, content) {
  try {
    fs.writeFileSync(fullPath, content, 'utf-8');

    dialog.showMessageBox(mainWindow, {
      title: 'Done',
      message: 'Subject saved successfully!',
      type: 'info'
    })
  }
  catch(e) { 
    dialog.showErrorBox("Error", "Could not save the structure");
    console.log(e);
  }
}

ipcMain.on('create-subject', (event, data) => {
  //console.log(data)
  if (!data.folder || !data.name) {
    dialog.showErrorBox("Error", "Please set a file name and a folder to save the subject in.");
  } else {
    const fullPath = data.folder + '\\' + data.name + '.txt';

    fs.access(fullPath, (err) => {
      if (err) {
        writeSubjectFile(fullPath, data.content);
      } else {
        // confirm dialog to overwrite
        showConfirmationDialog().then((confirmed) => {
          if (confirmed) {
            writeSubjectFile(fullPath, data.content);
          }
        });
      }
    });
  }
});

// FUGUE GENERATION

// if number of files is 1, generate only one file called outputName (for example "result")
// else, generate outputName + i (for example "result1", "result2", "result3")
function checkFileOverwrites(filesSet, outputName, numberOfFiles){
  let fileConflicts = [];

  if (numberOfFiles == 1) {
    if (filesSet.has(outputName)){
      fileConflicts.push(outputName);
    }
  } else {
    for (let i = 1; i <= numberOfFiles; i++) {
      const name = outputName + i + ".midi";
      if (filesSet.has(name)){
        fileConflicts.push(name);
      }
    } 
  }

  return fileConflicts;
}

function generateFugue(data){
  //const venv = spawn("D:/licenta/PComposer/venv/Scripts/activate.bat");
  const python = spawn("D:/licenta/PComposer/venv/Scripts/python", ["../PComposer/main.py", data.subject, data.structure, data.numberOfFiles, data.outputFolder, data.outputName]);
  console.log("called")
  python.stdout.on("data", (result) => {
    console.log(new Buffer(result).toString('ascii'))
  });
}

ipcMain.on('generate-fugue', (event, data) => {
  //console.log(data)
  if (!data.subject || !data.structure || !data.numberOfFiles || !data.outputFolder || !data.outputName) {
    dialog.showErrorBox("Error", "Please complete all form fields.");
  } else {
    //console.log(fs.readdirSync(data.outputFolder));
    const existentFiles = new Set(fs.readdirSync(data.outputFolder));

    const fileConflicts = checkFileOverwrites(existentFiles, data.outputName, data.numberOfFiles);

    if (fileConflicts.length == 0){
      // maybe show info that generation started
      // call python to generate
      generateFugue(data);
    } else {
      dialog.showMessageBox(mainWindow, {
        message: "The following files already exist in the selected folder: " + fileConflicts.join(', ') + ". Do you want to overwrite them?",
        type: "warning",
        buttons: ["OK", "Cancel"]
      }).then(result => {
        if (result.response == 0){
          // call python to generate
          generateFugue(data);
        }
      })
    }
  }
});