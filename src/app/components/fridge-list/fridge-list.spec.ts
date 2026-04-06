import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FridgeListComponent } from './fridge-list';

describe('FridgeList', () => {
  let component: FridgeListComponent;
  let fixture: ComponentFixture<FridgeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FridgeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FridgeListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
