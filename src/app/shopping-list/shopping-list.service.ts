import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private items: Ingredient[] = [];
  itemsChanged = new Subject<Ingredient[]>();

  constructor() {
  }

  addItem(ingredient: Ingredient): void {
    const exist = this.items.some((item => {
      return item.name === ingredient.name;
    }));
    if (!exist) { // not in the list
      this.items.push(ingredient);
      this.itemsChanged.next(this.items.slice());
    }
  }

  // TODO delete item from shopping list
  deleteItem(ingredient: Ingredient): void {
    this.items = this.items.filter((item) => {
      return item.name !== ingredient.name;
    });
    this.itemsChanged.next(this.items.slice());
  }

  // getter
  getItems(): Ingredient[] {
    if (this.items.length) {
      return this.items.slice();
    } else {
      return [];
    }
  }
}
