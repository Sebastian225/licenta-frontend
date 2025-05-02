import { Component, inject, OnInit } from '@angular/core';
import { NoteConstants } from '@app/shared/constants';
import { Note, NoteDuration, NoteDurations } from './dto/note';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ElectronService } from '@app/shared/service/electron.service';
import * as Tone from "tone";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
  noteDurations = NoteDurations;

  constructor(
    private _electronService: ElectronService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    for (let i = 0; i < this.noteDurations.length; i++){
      const duration = this.noteDurations[i];
      iconRegistry.addSvgIcon(duration.value, sanitizer.bypassSecurityTrustResourceUrl(duration.icon));
    }
  }

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

      let pitch = notes[i].isRest ? 'empty' : notes[i].getMidiPitch();

      result += pitch + ' ' + notes[i].duration.value + '\n';
    }

    return result;
  }

  createSubject(outputData: any): void {

    console.log(this.getFileContent(this.notes));

    this._electronService.send('create-subject', {
      folder: outputData.folderPath,
      name: outputData.name,
      content: this.getFileContent(this.notes)
    });
  }

  async playNotes(startIndex?: number): Promise<void> {
    if (!startIndex){
      startIndex = 0;
    }

    await Tone.start();
    const synth = new Tone.Synth().toDestination();

    let currentTime = Tone.now();

    for (let i = startIndex; i < this.notes.length; i++) {
      const note = this.notes[i];

      const duration = note.duration.midiPlaybackNotation;
      const timeToAdd = Tone.Time(duration).toSeconds();

      if (!note.isRest) {
        const pitch = note.getMidiPitch();
        synth.triggerAttackRelease(pitch, duration, currentTime);
      }

      currentTime += timeToAdd;
    }
  }

  async playSingleNote(note: Note): Promise<void> {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();

    let currentTime = Tone.now();

    if (!note.isRest) {
      const pitch = note.getMidiPitch();
      synth.triggerAttackRelease(pitch, note.duration.midiPlaybackNotation, currentTime);
    }
  }

  displayDurationIcon(duration: NoteDuration): string {
    return duration ? duration.icon : '';
  }
  
  compareDurations(a: NoteDuration, b: NoteDuration): boolean {
    return a && b && a.value === b.value;
  }

}
