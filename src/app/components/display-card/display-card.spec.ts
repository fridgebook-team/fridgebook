import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCard } from './display-card';

describe('DisplayCard', () => {
  let component: DisplayCard;
  let fixture: ComponentFixture<DisplayCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayCard],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
