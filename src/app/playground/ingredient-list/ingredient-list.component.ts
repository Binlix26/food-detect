import { Component, OnDestroy, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { FoodService } from '../food.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/shared/message.service';
import { LySnackBar } from '@alyle/ui/snack-bar';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  isLoading: boolean;
  private subscription: Subscription;
  private loadingSub: Subscription;

  constructor(
    private foodService: FoodService,
    private mesService: MessageService
  ) {}

  ngOnInit() {
    this.isLoading = false;
    this.ingredients = this.foodService.getStoredIngredients();
    this.subscription = this.foodService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.loadingSub = this.mesService.loadingStatusChanged.subscribe(
      message => (this.isLoading = message.isLoading)
    );
  }

  delete(ingredient: Ingredient): void {
    this.foodService.deleteIngredient(ingredient);
  }

  addToShopping(ingredient: Ingredient, sb: LySnackBar): void {
    // console.log(sb);
    this.foodService.toShoppingList(ingredient);
    sb.open();
  }

  addAllToShopping(sb: LySnackBar): void {
    this.foodService.toShoppingListAll(this.ingredients.slice());
    sb.open();
  }

  ngOnDestroy(): void {
    // free memory as this is not Angular managed Observable
    this.subscription.unsubscribe();
    this.loadingSub.unsubscribe();
  }
}
