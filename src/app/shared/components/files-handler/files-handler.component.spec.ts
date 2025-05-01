import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesHandlerComponent } from './files-handler.component';

describe('FilesHandlerComponent', () => {
  let component: FilesHandlerComponent;
  let fixture: ComponentFixture<FilesHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
