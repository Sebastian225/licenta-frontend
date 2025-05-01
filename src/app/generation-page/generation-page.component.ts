import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '@app/shared/service/electron.service';

@Component({
  selector: 'app-generation-page',
  templateUrl: './generation-page.component.html',
  styleUrls: ['./generation-page.component.scss']
})
export class GenerationPageComponent implements OnInit {

  subjectFile: string = '';
  subjectFilePath: string = '';
  structureFile: string = '';
  structureFilePath: string = '';
  howManyFiles: number = 1;
  outputFolder: string = '';
  outputName: string = '';

  @ViewChild('outputFolderField')
  outputFolderField!: ElementRef;
  @ViewChild('subjectFileField')
  subjectFileField!: ElementRef;
  @ViewChild('structureFileField')
  structureFileField!: ElementRef;

  constructor(private _electronService: ElectronService) {
  }

  ngOnInit(): void {
    this.initSignals();
  }

  initSignals(): void {
    this._electronService.on('select-subject-file', (event: Electron.IpcMessageEvent, result: string) => {
      this.subjectFilePath = result;
      const split = this.subjectFilePath.split('\\');
      this.subjectFile = split[split.length - 1];
      this.subjectFileField.nativeElement.blur();
    });

    this._electronService.on('select-structure-file', (event: Electron.IpcMessageEvent, result: string) => {
      this.structureFilePath = result;
      const split = this.structureFilePath.split('\\');
      this.structureFile = split[split.length - 1];
      this.structureFileField.nativeElement.blur();
    });

    this._electronService.on('select-folder', (event: Electron.IpcMessageEvent, result: string) => {
      this.outputFolder = result;
      this.outputFolderField.nativeElement.blur();
    });
  }

  browseSubject(): void {
    this._electronService.send('select-subject-file');
  }

  browseStructure(): void {
    this._electronService.send('select-structure-file');
  }

  browseOutputFolder(): void {
    this._electronService.send('select-folder');
  }

  generate(): void{
    this._electronService.send('generate-fugue', {
      subject: this.subjectFilePath,
      structure: this.structureFilePath,
      numberOfFiles: this.howManyFiles,
      outputFolder: this.outputFolder,
      outputName: this.outputName
    })
  }
}
