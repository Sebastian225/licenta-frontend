import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MenuService } from '@app/shared/service/menu.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  menuEntries: {
    icon: string,
    text: string
  }[] = [
    {
      icon: 'plm',
      text: "Structure editor"
    },
    {
      icon: 'plm',
      text: "Subject editor"
    },
  ]

  isExpanded: boolean = true;
  isHovering: boolean = false;

  constructor(private _menuService: MenuService) { }

  ngOnInit(): void {
  }

  @Output()
  onMenuExpanded = new EventEmitter<boolean>();

  expandMenu() {
    this.isExpanded = !this.isExpanded;
    this.onMenuExpanded.emit(this.isExpanded);
    this._menuService.menuExpanded = this.isExpanded;
  }
}
