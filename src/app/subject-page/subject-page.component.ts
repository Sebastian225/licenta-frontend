import { Component, OnInit } from '@angular/core';
import { NoteConstants } from '@app/shared/constants';
import { Note } from './dto/note';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ElectronService } from '@app/shared/service/electron.service';

@Component({
  selector: 'app-subject-page',
  templateUrl: './subject-page.component.html',
  styleUrls: ['./subject-page.component.scss']
})
export class SubjectPageComponent implements OnInit {

  notes: Note[] = [
    new Note()
  ];

  notePitches = NoteConstants.Pitches;
  noteOctaves = NoteConstants.Octaves;
  noteDurations = NoteConstants.DurationList;

  constructor(private _electronService: ElectronService) { }

  ngOnInit(): void {
  }

  addNote(): void {
    this.notes.push(new Note());
  }

  deleteNote(index: number): void {
    this.notes.splice(index, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }

  getFileContent(notes: Note[]): string {
    let result = '';

    for(let i = 0; i < notes.length; i++){
      result += notes[i].pitch + notes[i].octave + ' ' + notes[i].duration + '\n';
    }

    return result;
  }

  createSubject(outputData: any): void {
    this._electronService.send('create-subject', {
      folder: outputData.folderPath,
      name: outputData.name,
      content: this.getFileContent(this.notes)
    });
  }

}
