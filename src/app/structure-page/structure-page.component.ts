import { ChangeDetectorRef, Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { KeysConsts, PartsConsts, StructuresStyleConsts, UtilityConsts } from '@shared/constants';
import { Key } from './dto/key';
import { Part } from './dto/part';
import { MenuService } from '@app/shared/service/menu.service';
import { Guid } from 'guid-typescript';
import { ElectronService } from '@app/shared/service/electron.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from '@app/shared/components/alert/alert.component';

@Component({
  selector: 'app-structure-page',
  templateUrl: './structure-page.component.html',
  styleUrls: ['./structure-page.component.scss']
})
export class StructurePageComponent implements OnInit {

  keys: Key[] = []
  parts: Part[][] = [];
  
  selectedKeys: Key[] = [];
  selectedParts: Part[] = [];

  menuSizeObserver: any;
  
  private menuSize = 0;

  outputFolder: string = "";
  outputName: string = "";

  constructor(
      private _menuService: MenuService, 
      private _electronService: ElectronService,
      private _dialog: MatDialog,
      private _changeDetector: ChangeDetectorRef
    ) { 
    this.menuSizeObserver = this._menuService.menuSize$.subscribe(val => {
      this.menuSize = val;
      this.partsButtonPosition.left = StructuresStyleConsts.WrapperMargin;
    });
  }

  private channelCleanups: (() => void)[] = [];

  ngOnInit(): void {
    this.initDefaultStructure();
    this.initShortcutsMap();

    this.channelCleanups.push(
      this._electronService.on('import-file', (event: Electron.IpcMessageEvent, result: {path: string, content: string}) => {
        let data = this.parseInputFileContent(result.content);
        this.keys = data.keys;
        this.parts = data.parts;

        this.initButtonsPositions();

        this._changeDetector.detectChanges();
      })
    );
  }

  ngOnDestroy(): void {
    this.menuSizeObserver.unsubscribe();
    this.channelCleanups.forEach(cleanup => {
      cleanup();
    });
  }

  private initButtonsPositions(): void {
    this.sectionsButtonPosition = {
      top:  StructuresStyleConsts.WrapperMargin + (( this.parts.length + 1 ) * ( StructuresStyleConsts.ElementSize + StructuresStyleConsts.ElementMargin ) + StructuresStyleConsts.LineHeight ) / 2 - StructuresStyleConsts.ButtonSize / 2,
      left: StructuresStyleConsts.WrapperMargin + this.keys.length * ( StructuresStyleConsts.ElementSize + StructuresStyleConsts.ElementMargin )
    }

    this.partsButtonPosition = {
      top: StructuresStyleConsts.WrapperMargin + ( this.parts.length + 1 ) * ( StructuresStyleConsts.ElementSize + StructuresStyleConsts.ElementMargin ) + StructuresStyleConsts.LineHeight,
      left: StructuresStyleConsts.WrapperMargin
    }
  }

  private initDefaultStructure(): void {
    this.keys = [
      new Key(KeysConsts.Tonic),
      new Key(KeysConsts.Dominant),
      new Key(KeysConsts.Tonic)
    ];

    this.parts = [
      [ new Part(PartsConsts.Subject), new Part(PartsConsts.CounterSubject, 1), new Part(PartsConsts.CounterSubject, 2) ],
      [ new Part(PartsConsts.Empty), new Part(PartsConsts.Answer), new Part(PartsConsts.CounterSubject, 1) ],
      [ new Part(PartsConsts.Empty), new Part(PartsConsts.Empty), new Part(PartsConsts.Subject) ]
    ]

    this.initButtonsPositions();
  }

  private initShortcutsMap(): void {
    this.KeyShortcutMap.set('KeyT', KeysConsts.Tonic);
    this.KeyShortcutMap.set('KeyD', KeysConsts.Dominant);
    this.KeyShortcutMap.set('KeyS', KeysConsts.Subdominant);
    this.KeyShortcutMap.set('KeyR', KeysConsts.Relative);
    this.KeyShortcutMap.set('KeyE', KeysConsts.RelativeDominant);

    this.PartsShortcutMap.set('KeyA', PartsConsts.Answer);
    this.PartsShortcutMap.set('KeyC', PartsConsts.CounterSubject);
    this.PartsShortcutMap.set('KeyS', PartsConsts.Subject);
    this.PartsShortcutMap.set('KeyE', PartsConsts.Empty);
    this.PartsShortcutMap.set('KeyF', PartsConsts.FreeCounterpoint);
  }

  selectKey(index: number, e: MouseEvent): void {
    this.resetSelectedParts();

    this.keys[index].selected = !this.keys[index].selected;

    let except = undefined;

    if (this.keys[index].selected === true) {
      this.selectedKeys.push(this.keys[index]);

      except = this.keys[index];

    } else {
      let i = this.selectedKeys.findIndex(item => item.id === this.keys[index].id);

      if (i != -1) {
        this.selectedKeys.splice(i, 1);
      }
    }

    if (!e.ctrlKey) {
      this.resetSelectedKeys(except);
    }
  }

  selectPart(line: number, index: number, e: MouseEvent): void {
    this.resetSelectedKeys();

    this.parts[line][index].selected = !this.parts[line][index].selected;

    let except = undefined;

    if (this.parts[line][index].selected === true) {
      this.selectedParts.push(this.parts[line][index]);

      except = this.parts[line][index];
    } else {
      let i = this.selectedParts.findIndex(item => item.id === this.parts[line][index].id);

      if (i != -1) {
        this.selectedParts.splice(i, 1);
      }
    }

    if (!e.ctrlKey) {
      this.resetSelectedParts(except);
    }
  }

  private resetSelectedKeys(except?: Key): void {
    for (let i = 0; i < this.selectedKeys.length; i++) {
      if (!except || except.id !== this.selectedKeys[i].id) {
        this.selectedKeys[i].selected = false;
      }
    }
    this.selectedKeys = [];

    if (except) {
      this.selectedKeys.push(except);
    }
  }

  private resetSelectedParts(except?: Part): void {
    for (let i = 0; i < this.selectedParts.length; i++) {
      if (!except || except.id !== this.selectedParts[i].id) {
        this.selectedParts[i].selected = false;
      }
    }
    this.selectedParts = [];

    if (except) {
      this.selectedParts.push(except);
    }
  }

  addSection() {
    this.keys.push(new Key(KeysConsts.Tonic));

    for (let line = 0; line < this.parts.length; line++) {
      this.parts[line].push(new Part(PartsConsts.Empty));
    }

    this.sectionsButtonPosition.left += StructuresStyleConsts.ElementSize + StructuresStyleConsts.ElementMargin;
  }

  private KeyShortcutMap: Map<string, string> = new Map<string, string>();
  private PartsShortcutMap: Map<string, string> = new Map<string, string>();

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.altKey) {
      if (this.selectedKeys.length) {

        let newValue = this.KeyShortcutMap.get(event.code);

        if (newValue) {
          for (let i = 0; i < this.selectedKeys.length; i++){
            this.selectedKeys[i].changeValue(newValue);
          }
        }

      } else if (this.selectedParts.length) {
        
        let newValue = this.PartsShortcutMap.get(event.code);

        if (newValue) {
          if (newValue === PartsConsts.CounterSubject){
            const dialogRef = this._dialog.open(AlertComponent);

            dialogRef.afterClosed().subscribe(result => {
              if (!result) {
                return;
              }
              this.writeParts(newValue, result);
            });
          } else {
            this.writeParts(newValue, null);
          }
        }

      }
    }
  }

  private writeParts(newValue: string | undefined, csIndex: number | null): void {
    if (!newValue) {
      return;
    }
    for (let i = 0; i < this.selectedParts.length; i++){
      if (newValue === PartsConsts.CounterSubject) {
        this.selectedParts[i].index = csIndex;
      }
      this.selectedParts[i].changeValue(newValue);
    }
  }

  addPart(){
    const sections = this.keys.length;

    let newPart = [];

    for (let i = 0; i < sections; i++) {
      newPart.push(new Part(PartsConsts.Empty));
    }

    this.parts.push(newPart);

    this.partsButtonPosition.top += StructuresStyleConsts.ElementSize + StructuresStyleConsts.ElementMargin;
    this.sectionsButtonPosition.top = StructuresStyleConsts.WrapperMargin + (( this.parts.length + 1 ) * ( StructuresStyleConsts.ElementSize + StructuresStyleConsts.ElementMargin ) + StructuresStyleConsts.LineHeight ) / 2 - StructuresStyleConsts.ButtonSize / 2;
  }

  partsButtonPosition: {top: number, left: number} = {top: 0, left: 0};
  sectionsButtonPosition: {top: number, left: number} = {top: 0, left: 0};

  isMenuVisible: boolean = false;
  contextMenuPosition: {top: number, left: number} = {top: 0, left: 0};
  contextMenuTarget: {row: number, col: number} = {row: -1, col: -1};

  showPartsContextMenu(line: number, index: number, e: MouseEvent): void {
    e.preventDefault();

    this.contextMenuPosition = {
      top: e.clientY,
      left: e.clientX - this.menuSize
    }

    this.isMenuVisible = true;
    this.contextMenuTarget.row = line;
    this.contextMenuTarget.col = index;
    this.isKeysContextMenu = false;
  }

  showKeysContextMenu(index: number, e: MouseEvent): void {
    e.preventDefault();

    this.contextMenuPosition = {
      top: e.clientY,
      left: e.clientX - this.menuSize
    }

    this.isMenuVisible = true;
    this.contextMenuTarget.col = index;
    this.isKeysContextMenu = true;
  }

  isKeysContextMenu: boolean = false;

  @HostListener('document:click')
  hideMenu(): void {
    this.isMenuVisible = false;
  }

  deleteColumn() {
    if (this.contextMenuTarget.col === -1) {
      return;
    }

    if (this.selectedParts.length) {
      let selectedIds = new Set<Guid>();

      for (let i = 0; i < this.parts.length; i++) {
        if (this.parts[i][this.contextMenuTarget.col].selected){
          selectedIds.add(this.parts[i][this.contextMenuTarget.col].id);
        }
      }

      for (let i = this.selectedParts.length - 1; i >= 0; i--) {
        if (selectedIds.has(this.selectedParts[i].id)) {
          this.selectedParts.splice(i, 1);
        }
      }
    }

    if (this.selectedKeys.length){
      for (let i = this.selectedKeys.length - 1; i >= 0; i--) {
        if (this.keys[this.contextMenuTarget.col].id === this.selectedKeys[i].id) {
          this.selectedKeys.splice(i, 1);
        }
      }
    }

    this.keys.splice(this.contextMenuTarget.col, 1);
    for (let i = 0; i < this.parts.length; i++) {
      this.parts[i].splice(this.contextMenuTarget.col, 1)
    }

    this.contextMenuTarget = {row: -1, col: -1};

    this.sectionsButtonPosition.left -= StructuresStyleConsts.ElementSize + StructuresStyleConsts.ElementMargin;
  }

  deleteRow() {
    if (this.contextMenuTarget.row === -1) {
      return;
    }

    if (this.selectedParts.length) {
      let selectedIds = new Set<Guid>();
      let row = this.parts[this.contextMenuTarget.row]

      for (let i = 0; i < row.length; i++) {
        if (row[i].selected){
          selectedIds.add(row[i].id);
        }
      }

      for (let i = this.selectedParts.length - 1; i >= 0; i--) {
        if (selectedIds.has(this.selectedParts[i].id)) {
          this.selectedParts.splice(i, 1);
        }
      }
    }

    this.parts.splice(this.contextMenuTarget.row, 1);

    this.contextMenuTarget = {row: -1, col: -1};

    this.partsButtonPosition.top -= StructuresStyleConsts.ElementSize + StructuresStyleConsts.ElementMargin;
    this.sectionsButtonPosition.top = StructuresStyleConsts.WrapperMargin + (( this.parts.length + 1 ) * ( StructuresStyleConsts.ElementSize + StructuresStyleConsts.ElementMargin ) + StructuresStyleConsts.LineHeight ) / 2 - StructuresStyleConsts.ButtonSize / 2;
  }

  createStructure(outputData: any){
    // if (this.outputFolder !== '' && this.outputName !== ''){
    //   this._electronService.send('create-structure');
    // } else {
      
    // }
    // const dialogRef = this._dialog.open(AlertComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    console.log(this.getFileContent(this.keys, this.parts));
    console.log(outputData)
    this._electronService.send('create-structure', {
      folder: outputData.folderPath,
      name: outputData.name,
      content: this.getFileContent(this.keys, this.parts)
    });
  }

  getFileContent(keys: Key[], parts: Part[][]): string {
    let result = '';
    
    for(let i = 0; i < keys.length; i++){
      result += keys[i].value + ' ';
    }

    result += '\n'

    for(let i = 0; i < parts.length; i++){
      for(let j = 0; j < parts[i].length; j++) {
        result += parts[i][j].value;
        if (parts[i][j].value === PartsConsts.CounterSubject) {
          result += parts[i][j].index;
        }
        result += ' ';
      }
      result += '\n';
    }

    return result.trimEnd();
  }

  private parseKeys(keys: string[]): Key[] {
    let result: Key[] = [];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (
        key === KeysConsts.Tonic ||
        key === KeysConsts.Dominant ||
        key === KeysConsts.Subdominant ||
        key === KeysConsts.Relative ||
        key === KeysConsts.RelativeDominant
      ) {
        result.push(new Key(key))
      }
      else {
        console.error("invalid key symbol: " + key);
        // TODO throw error and catch it later to not create weird structures
      }
    }

    return result;
  }

  private parseParts(parts: string[][]): Part[][] {
    let result: Part[][] = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      result.push([]);
      for (let j = 0; j < part.length; j++) {
        const symbol = part[j];
        if (
          symbol === PartsConsts.Subject ||
          symbol === PartsConsts.Answer ||
          symbol === PartsConsts.Empty ||
          symbol === PartsConsts.FreeCounterpoint
        ) {
          result[i].push(new Part(symbol))
        }
        else if (symbol.slice(0, 2) === PartsConsts.CounterSubject) {
          result[i].push(new Part(PartsConsts.CounterSubject, parseInt(symbol.slice(2))));
        }
        else {
          console.log("Invalid part symbol: " + part);
        }
      }
    }

    return result;
  }

  private parseInputFileContent(data: string): {keys: Key[], parts: Part[][]} {
    let result: {keys: Key[], parts: Part[][]} = {
      keys: [],
      parts: []
    }

    const lines = data.replace('\r', '').split('\n');
    console.log(lines)
    if (lines.length !== 4 && lines.length !== 5) {
      console.error("Invalid structure. Number of parts should be 3 or 4 for now.");
      return result;
    }

    const keys = lines[0].trim().split(/\s+/);
    const parts = lines.slice(1).map(line => line.trim().split(/\s+/));

    console.log(keys);
    console.log(parts)

    if (!parts.every(part => part.length === keys.length)) {
      console.error("Invalid structure. Number of columns should be consistent across lines.");
      return result;
    }

    result.keys = this.parseKeys(keys);
    result.parts = this.parseParts(parts);

    return result;
  }
}

// opeth SORROW got me through this 
