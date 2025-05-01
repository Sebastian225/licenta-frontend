import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  expandedSize = 225;
  closedSize = 65;
  isExpanded = true;

  constructor() { }

  menuSizeSubject = new BehaviorSubject<number>(this.expandedSize);
  menuSize$ = this.menuSizeSubject.asObservable();

  get menuSize(): number {
    return this.menuSizeSubject.value;
  }


  set menuExpanded(isExpanded: boolean) {
    this.isExpanded = isExpanded;

    if (this.isExpanded) {
      this.menuSizeSubject.next(this.expandedSize);
    } else {
      this.menuSizeSubject.next(this.closedSize);
    }
  }
}
