import { PartsConsts } from "@app/shared/constants";
import { Guid } from "guid-typescript";

export class Part {
    id: Guid = Guid.create();
    value: string = '';
    displayValue: string = '';
    selected: boolean = false;
    index: number | null = null; // for CS only

    constructor(value: string, index: number | null = null) {
        this.value = value;
        this.index = index;
        this.displayValue = PartsConsts.getDisplayValue(value, index);
    }

    changeValue(newValue: string): void {
        this.value = newValue;
        this.displayValue = PartsConsts.getDisplayValue(newValue, this.index);
    }
}