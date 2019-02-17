import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDetectionComponent } from './food-detection.component';

describe('FoodDetectionComponent', () => {
  let component: FoodDetectionComponent;
  let fixture: ComponentFixture<FoodDetectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodDetectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
