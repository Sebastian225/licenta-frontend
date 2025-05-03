import { Component, OnInit, EventEmitter, ViewChild, ElementRef, Output, ChangeDetectorRef } from '@angular/core';
import { ElectronService } from '@app/shared/service/electron.service';

@Component({
  selector: 'app-files-handler',
  templateUrl: './files-handler.component.html',
  styleUrls: ['./files-handler.component.scss']
})
export class FilesHandlerComponent implements OnInit {

  private channelCleanups: (() => void)[] = [];

  constructor(
    private _electronService: ElectronService,
    private _changeDetector: ChangeDetectorRef
  ) { }

  outputData = {
    folderPath: "",
    name: ""
  }

  ngOnInit(): void {
    this.initElectronListeners();
  }

  ngOnDestroy(): void {
    this.channelCleanups.forEach(cleanup => {
      cleanup();
    });
  }

  browseFolder() {
    this._electronService.send('select-folder');
  }

  @Output()
  createEvent: EventEmitter<{
    folderPath: string,
    name: string
  }> = new EventEmitter();

  createMethodCall(): void {
    this.createEvent.emit(this.outputData);
  }

  @ViewChild('outputField')
  outputFolderField!: ElementRef;

  initElectronListeners() {
      this._electronService.on('select-folder', (event: Electron.IpcMessageEvent, result: string) => {
        this.outputData.folderPath = result;
        this.outputFolderField.nativeElement.blur();
      });

      this._electronService.on('import-file', (event: Electron.IpcMessageEvent, result: {path: string, content: string}) => {
        const splitPath = result.path.split('\\');
        this.outputData.name = splitPath[splitPath.length - 1].replace('.txt', '');
        let simplePath = '';
        for (let i = 0; i < splitPath.length - 1; i++) {
          simplePath += splitPath[i] + '\\';
        }
        this.outputData.folderPath = simplePath;

        this._changeDetector.detectChanges();
      });
  }

  browseFile() {
    this._electronService.send('import-file');
  }

  // TODO add spinner for when loading files
  // TODO maybe add some custom file formats in order to be harder to corrupt files
  // poate la master idk
}
