import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {DataStorageService} from '../shared/data-storage.service';
import {Subject} from 'rxjs';
import {ClarifaiResp} from '../shared/clarifai-response.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class FoodService {

  private ingredients: Ingredient[] = [];
  private sequential = 1;
  private lastImage = '';
  ingredientsChanged = new Subject<Ingredient[]>();

  constructor(
    private dataStorage: DataStorageService,
    private slService: ShoppingListService
  ) {
  }

  getIngredients(url: string) {
      this.dataStorage.fetchData(url).subscribe(
        (res: ClarifaiResp) => {
          const predictions = res.outputs[0].data.concepts;
          if (predictions) {
            // clear the storage for new data
            this.onClear();
            this.lastImage = url;
            this.ingredients = predictions.map((ingredient) => {
              return new Ingredient(this.sequential++, ingredient.name);
            });
            // broadcast for the subscriber
            this.ingredientsChanged.next(this.ingredients.slice());
          } else {
            // probably never happen as the API always return funny predictions
            // TODO logging wrong image message.
          }
        },
        error => {
          // TODO use logging service that will be created later
          console.log(error);
        }
      );
  }

  // getter
  getStoredIngredients(): Ingredient[] {
    if (this.ingredients.length) {
      return this.ingredients.slice();
    } else {
      return [];
    }
  }

  deleteIngredient(ingredient: Ingredient): void {
    this.ingredients = this.ingredients.filter(
      (ingred: Ingredient) => {
        return ingred.name !== ingredient.name;
      });
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  toShoppingList(ingredient: Ingredient): void {
    this.slService.addItem(ingredient);
  }

  getLastImage(): string {
    return this.lastImage;
  }

  private onClear() {
    this.sequential = 0;
    this.ingredients = [];
  }
}
