export class NoteDuration {
    icon: string = '';
    value: string = '';
    midiPlaybackNotation: string = '';

    private static noteDurationMap: Record<string,{ icon: string; midi: string }> = {
        'full': { icon: './assets/notes/Full.svg', midi: '1n' },
        'full-point': { icon: './assets/notes/FullPoint.svg', midi: '1n.' },
        'half': { icon: './assets/notes/Half.svg', midi: '2n' },
        'half-point': { icon: './assets/notes/HalfPoint.svg', midi: '2n.' },
        'quarter': { icon: './assets/notes/Quarter.svg', midi: '4n' },
        'quarter-point': { icon: './assets/notes/QuarterPoint.svg', midi: '4n.' },
        'eighth': { icon: './assets/notes/Eighth.svg', midi: '8n' },
        'eighth-point': { icon: './assets/notes/EighthPoint.svg', midi: '8n.' },
        'sixteenth': { icon: './assets/notes/Sixteenth.svg', midi: '16n' },
        'sixteenth-point': { icon: './assets/notes/SixteenthPoint.svg', midi: '16n.' },
        '32th': { icon: './assets/notes/ThirtySecond.svg', midi: '32n' },
        '32th-point': { icon: './assets/notes/ThirtySecondPoint.svg', midi: '32n.' },
    };

    constructor(value: string) {
        const data = NoteDuration.noteDurationMap[value];
        if (!data) throw new Error(`Invalid note value: ${value}`);
        this.icon = data.icon;
        this.value = value;
        this.midiPlaybackNotation = data.midi;
      }
}

export class Note {
    pitch: string = 'C';
    octave: number = 4;
    duration: NoteDuration = new NoteDuration('quarter');
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

//should've generated from the record btw if you even care
export const NoteDurations: NoteDuration[] = [
    new NoteDuration('full'),
    new NoteDuration('full-point'),
    new NoteDuration('half'),
    new NoteDuration('half-point'),
    new NoteDuration('quarter'),
    new NoteDuration('quarter-point'),
    new NoteDuration('eighth'),
    new NoteDuration('eighth-point'),
    new NoteDuration('sixteenth'),
    new NoteDuration('sixteenth-point'),
    new NoteDuration('32th'),
    new NoteDuration('32th-point'),
  ];