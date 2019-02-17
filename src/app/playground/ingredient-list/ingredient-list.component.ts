import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {FoodService} from '../food.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private subscription: Subscription;

  constructor(
    private foodService: FoodService
  ) {
  }

  ngOnInit() {
    this.ingredients = this.foodService.getStoredIngredients();
    this.subscription = this.foodService.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  delete(ingredient: Ingredient): void {
    this.foodService.deleteIngredient(ingredient);
    // TODO logging service
  }

  addToShopping(ingredient: Ingredient): void {
    this.foodService.toShoppingList(ingredient);
    // TODO logging service
  }

  ngOnDestroy(): void {
    // free memory as this is not Angular managed Observable
    this.subscription.unsubscribe();
  }
}
