import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularRecipes } from './popular-recipes';

describe('PopularRecipes', () => {
  let component: PopularRecipes;
  let fixture: ComponentFixture<PopularRecipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularRecipes],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularRecipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
