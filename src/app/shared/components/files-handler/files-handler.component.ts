import { Component, OnInit, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { ElectronService } from '@app/shared/service/electron.service';

@Component({
  selector: 'app-files-handler',
  templateUrl: './files-handler.component.html',
  styleUrls: ['./files-handler.component.scss']
})
export class FilesHandlerComponent implements OnInit {

  constructor(private _electronService: ElectronService) { }

  outputData = {
    folderPath: "",
    name: ""
  }

  ngOnInit(): void {
    this.initElectronListeners();
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
  }

}
