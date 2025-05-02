export class NoteDuration {
    icon: string = '';
    value: string = '';
    midiPlaybackNotation: string = '';

    constructor(icon: string, value: string, midiPlaybackNotation: string) {
        this.icon = icon;
        this.value = value;
        this.midiPlaybackNotation = midiPlaybackNotation
    }
}

export class Note {
    pitch: string = 'C';
    octave: number = 4;
    duration: NoteDuration = new NoteDuration('assets/notes/Quarter.svg', 'quarter', '4n');
    isRest: boolean = false;

    constructor(pitch?: string, octave?: number, duration?: NoteDuration, isRest?: boolean) {
        if (pitch){
            this.pitch = pitch;
        }
        if (octave){
            this.octave = octave;
        }
        if (duration){
            this.duration = duration;
        }
        if (isRest){
            this.isRest = isRest;
        }
    }

    getMidiPitch(): string {
        return this.pitch + this.octave;
    }
}

export const NoteDurations: NoteDuration[] = [
    new NoteDuration('assets/notes/Full.svg', 'full', '1n'),
    new NoteDuration('assets/notes/FullPoint.svg', 'full-point', '1n.'),
    new NoteDuration('assets/notes/Half.svg', 'half', '2n'),
    new NoteDuration('assets/notes/HalfPoint.svg', 'half-point', '2n.'),
    new NoteDuration('assets/notes/Quarter.svg', 'quarter', '4n'),
    new NoteDuration('assets/notes/QuarterPoint.svg', 'quarter-point', '4n.'),
    new NoteDuration('assets/notes/Eighth.svg', 'eighth', '8n'),
    new NoteDuration('assets/notes/EighthPoint.svg', 'eighth-point', '8n.'),
    new NoteDuration('assets/notes/Sixteenth.svg', 'sixteenth', '16n'),
    new NoteDuration('assets/notes/SixteenthPoint.svg', 'sixteenth-point', '16n.'),
    new NoteDuration('assets/notes/ThirtySecond.svg', '32th', '32n'),
    new NoteDuration('assets/notes/ThirtySecondPoint.svg', '32th-point', '32n.')
];