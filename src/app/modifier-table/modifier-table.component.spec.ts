import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierTableComponent } from './modifier-table.component';

describe('ModifierTableComponent', () => {
  let component: ModifierTableComponent;
  let fixture: ComponentFixture<ModifierTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
