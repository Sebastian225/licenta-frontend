import { NoteConstants } from "@app/shared/constants";

export class Note {
    pitch: string = 'C';
    octave: number = 4;
    duration: string = NoteConstants.Durations.Quarter;
}