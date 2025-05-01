import {app, BrowserWindow, ipcMain} from 'electron';

class Main {
  private mainWindow!: BrowserWindow;

  public init() {
    app.on('ready', this.createWindow);
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
  }

  private onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private onActivate() {
    if (!this.mainWindow) {
      this.createWindow();
    }
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      height: 1200,
      width: 1600,
      title: `PComposer`,
      webPreferences: {
        nodeIntegration: true // makes it possible to use `require` within our index.html
      }
    });

    const env = process.env['NODE_ENV'] || 'development';

    this.mainWindow.webContents.openDevTools();
    if(env.toLowerCase() === 'development') {
        this.mainWindow.loadURL('http://localhost:4200')
      } else {
        this.mainWindow.loadFile(/* Angular dist folder path */'dist/browser/index.html')
      }
  }
}

// Here we go!
(new Main()).init();