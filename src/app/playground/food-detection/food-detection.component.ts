import {Component, OnInit} from '@angular/core';
import {FoodService} from '../food.service';

@Component({
  selector: 'app-food-detection',
  templateUrl: './food-detection.component.html',
  styleUrls: ['./food-detection.component.css']
})
export class FoodDetectionComponent implements OnInit {

  imageUrl: string;

  constructor(
    private foodService: FoodService
  ) {
  }

  ngOnInit() {
    this.imageUrl = this.foodService.getLastImage();
  }

  onSubmit(url: string): void {
    const iUrl = url.trim();
    if (iUrl) {
      this.imageUrl = iUrl;
      this.foodService.getIngredients(iUrl);
    } else {
      this.logError();
    }
  }
  
  onKeyPress(event: Event): void {
    // cast the event to avoid type error
    const url = (event.target as HTMLInputElement).value.trim();
    if (url && (event as KeyboardEvent).charCode === 13) {
      this.onSubmit(url);
    } else {
      this.logError();
    }
  }

  private logError() {
    // TODO logging error prompt
  }
}
