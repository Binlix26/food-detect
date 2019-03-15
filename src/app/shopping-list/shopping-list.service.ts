import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private items: Ingredient[] = [];
  itemsChanged = new Subject<Ingredient[]>();

  constructor() {}

  getItemByName(name: string): Ingredient {
    let toReturn = null;
    this.items.some((item: Ingredient) => {
      if (item.name === name) {
        toReturn = item;
        return true; // break, get the item
      }
      return false; // keep going
    });
    return toReturn;
  }

  addItem(ingredient: Ingredient): void {
    const exist = this.items.some((item: Ingredient) => {
      return item.name === ingredient.name;
    });
    if (!exist) {
      // not in the list
      this.items.push(ingredient);
      this.itemsChanged.next(this.items.slice());
    }
  }

  addItems(ingredients: Ingredient[]): void {
    const toJoined = ingredients.filter((ingredient: Ingredient) => {
      let isExist = false;
      for (const item of this.items) {
        if (item.name === ingredient.name) {
          isExist = true;
          break;
        }
      }
      // if it is not in the shopping list, then keep it
      return !isExist;
    });
    // also can use
    // this.items.push(...toJoined);
    this.items = this.items.concat(toJoined);
    this.itemsChanged.next(this.items.slice());
  }

  updateItem(ingredient: Ingredient): void {
    const toUpdate = this.getItemByName(ingredient.name);
    toUpdate.desc = ingredient.desc;
  }

  deleteItem(ingredient: Ingredient): void {
    this.items = this.items.filter((item: Ingredient) => {
      return item.name !== ingredient.name;
    });
    this.itemsChanged.next(this.items.slice());
  }

  searchItem(term: string): void {
    if (!this.items.length) {
      return null;
    }

    const results = this.items.filter((item: Ingredient) => {
      return item.name.includes(term);
    });
    this.itemsChanged.next(results);
  }

  restoreItems() {
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
