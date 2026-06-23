import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandStamp } from './brand-stamp';

describe('BrandStamp', () => {
  let component: BrandStamp;
  let fixture: ComponentFixture<BrandStamp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandStamp],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandStamp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
