import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructurePageComponent } from './structure-page.component';

describe('StructurePageComponent', () => {
  let component: StructurePageComponent;
  let fixture: ComponentFixture<StructurePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructurePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructurePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
