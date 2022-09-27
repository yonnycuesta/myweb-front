import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuComponent } from './statu.component';

describe('StatuComponent', () => {
  let component: StatuComponent;
  let fixture: ComponentFixture<StatuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
