export class KeysConsts {
    public static readonly Tonic = 'T';
    public static readonly Dominant = 'D';
    public static readonly Subdominant = 'SD';
    public static readonly Relative = 'R';
    public static readonly RelativeDominant = 'DR';

    public static readonly TonicDisplayValue = 'Tonic';
    public static readonly DominantDisplayValue = 'Dominant';
    public static readonly SubdominantDisplayValue = 'Subdominant';
    public static readonly RelativeDisplayValue = 'Relative';
    public static readonly RelativeDominantDisplayValue = 'Relative dominant';

    public static getDisplayValue(code: string): string {
        if (code === KeysConsts.Tonic){
            return KeysConsts.TonicDisplayValue;
        }

        if (code === KeysConsts.Dominant){
            return KeysConsts.DominantDisplayValue;
        }

        if (code === KeysConsts.Subdominant){
            return KeysConsts.SubdominantDisplayValue;
        }

        if (code === KeysConsts.Relative){
            return KeysConsts.RelativeDisplayValue;
        }

        if (code === KeysConsts.RelativeDominant){
            return KeysConsts.RelativeDominantDisplayValue;
        }

        return '';
    }
}

export class PartsConsts {
    public static readonly Subject = 'S';
    public static readonly Answer = 'A';
    public static readonly CounterSubject = 'CS';
    public static readonly Empty = 'E';

    public static readonly SubjectDisplayValue = 'Subject';
    public static readonly AnswerDisplayValue = 'Answer';
    public static readonly CounterSubjectDisplayValue = 'Counter subject';
    public static readonly EmptyDisplayValue = 'Empty';

    public static getDisplayValue(code: string, index: number | null): string {
        if (code === PartsConsts.Subject){
            return PartsConsts.SubjectDisplayValue;
        }

        if (code === PartsConsts.Answer){
            return PartsConsts.AnswerDisplayValue;
        }

        if (code === PartsConsts.CounterSubject){
            return PartsConsts.CounterSubjectDisplayValue + ' ' + index;
        }

        if (code === PartsConsts.Empty){
            return PartsConsts.EmptyDisplayValue;
        }

        return '';
    }
}

export class StructuresStyleConsts {
    public static WrapperMargin = 16;
    public static ElementSize = 150;
    public static ElementMargin = 8;
    public static LineHeight = 16;
    public static ButtonSize = 40;
}

export class UtilityConsts {
    public static LeftMouseButton = 0;
    public static RightMouseButton = 2;
}

export class NoteConstants {
    public static readonly Pitches = [
        'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
    ]

    public static readonly Octaves = [
        2, 3, 4, 5, 6
    ];

    // public static readonly Durations = {
    //     Full: { Duration: 'full', iconPath: 'assets/notes/Full.svg' },
    //     FullPoint: { Duration: 'full-point', iconPath: 'assets/notes/FullPoint.svg' },
    //     Half: { Duration: 'half', iconPath: 'assets/notes/Half.svg' },
    //     HalfPoint: { Duration: 'half-point', iconPath: 'assets/notes/HalfPoint.svg' },
    //     Quarter: { Duration: 'quarter', iconPath: 'assets/notes/Quarter.svg' },
    //     QuarterPoint: { Duration: 'quarter-point', iconPath: 'assets/notes/QuarterPoint.svg' },
    //     Eighth: { Duration: 'eighth', iconPath: 'assets/notes/Eighth.svg' },
    //     EighthPoint: { Duration: 'eighth-point', iconPath: 'assets/notes/EighthPoint.svg' },
    //     Sixteenth: { Duration: 'sixteenth', iconPath: 'assets/notes/Sixteenth.svg' },
    //     SixteenthPoint: { Duration: 'sixteenth-point', iconPath: 'assets/notes/SixteenthPoint.svg' },
    //     ThirtySecond: { Duration: '32th', iconPath: 'assets/notes/ThirtySecond.svg' },
    //     ThirtySecondPoint: { Duration: '32th-point', iconPath: 'assets/notes/ThirtySecondPoint.svg' }
    // };
    
    public static readonly Durations = {
        Full: 'full',
        FullPoint: 'full-point',
        Half: 'half',
        HalfPoint: 'half-point',
        Quarter: 'quarter',
        QuarterPoint: 'quarter-point',
        Eighth: 'eighth',
        EighthPoint: 'eighth-point',
        Sixteenth: 'sixteenth',
        SixteenthPoint: 'sixteenth-point',
        ThirtySecond: '32th',
        ThirtySecondPoint: '32th-point'
    };

    public static readonly DurationList: string[] = [
        NoteConstants.Durations.Full,
        NoteConstants.Durations.FullPoint,
        NoteConstants.Durations.Half,
        NoteConstants.Durations.HalfPoint,
        NoteConstants.Durations.Quarter,
        NoteConstants.Durations.QuarterPoint,
        NoteConstants.Durations.Eighth,
        NoteConstants.Durations.EighthPoint,
        NoteConstants.Durations.Sixteenth,
        NoteConstants.Durations.SixteenthPoint,
        NoteConstants.Durations.ThirtySecond,
        NoteConstants.Durations.ThirtySecondPoint
    ];
    
}