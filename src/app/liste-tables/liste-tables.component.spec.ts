import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTablesComponent } from './liste-tables.component';

describe('ListeTablesComponent', () => {
  let component: ListeTablesComponent;
  let fixture: ComponentFixture<ListeTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
