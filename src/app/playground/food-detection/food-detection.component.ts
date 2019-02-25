import { Component, OnInit, OnDestroy } from '@angular/core';
import { FoodService } from '../food.service';
import { MessageService } from 'src/app/shared/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-detection',
  templateUrl: './food-detection.component.html',
  styleUrls: ['./food-detection.component.css']
})
export class FoodDetectionComponent implements OnInit, OnDestroy {
  imageUrl: string;
  errorMessage: string;
  private logSubscription: Subscription;
  constructor(
    private foodService: FoodService,
    private mesService: MessageService
  ) {}

  ngOnInit() {
    this.imageUrl = this.foodService.getLastImage();
    this.logSubscription = this.mesService.loggingChanged.subscribe(message => {
      this.errorMessage = message;
    });
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
    if ((event as KeyboardEvent).key === 'Enter') {
      if (url) {
        this.onSubmit(url);
      } else {
        this.logError();
      }
    }
  }

  ngOnDestroy(): void {
    this.logSubscription.unsubscribe();
  }

  private logError() {
    this.mesService.logError('Field Cannot be empty');
  }
}
