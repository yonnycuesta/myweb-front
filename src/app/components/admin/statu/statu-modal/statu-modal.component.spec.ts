import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuModalComponent } from './statu-modal.component';

describe('StatuModalComponent', () => {
  let component: StatuModalComponent;
  let fixture: ComponentFixture<StatuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatuModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
