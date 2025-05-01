import { Component, OnInit } from '@angular/core';
import { NoteConstants } from '@app/shared/constants';
import { Note } from './dto/note';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  constructor() { }

  ngOnInit(): void {
    console.log(this.notes[0])
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

}
