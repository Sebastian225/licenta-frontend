import { KeysConsts } from "@app/shared/constants";
import { Guid } from "guid-typescript";

export class Key {
    id: Guid = Guid.create();
    value: string = '';
    displayValue: string = '';
    selected: boolean = false;

    constructor(value: string) {
        this.value = value;
        this.displayValue = KeysConsts.getDisplayValue(value);
    }

    changeValue(newValue: string): void {
        this.value = newValue;
        this.displayValue = KeysConsts.getDisplayValue(newValue);
    }
}