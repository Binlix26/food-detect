import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subscription} from 'rxjs';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  items: Ingredient[] = [];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.items = this.slService.getItems();
    this.subscription = this.slService.itemsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.items = ingredients;
      });
  }

  onDelete(ingredient: Ingredient): void {
    this.slService.deleteItem(ingredient);
  }

  ngOnDestroy(): void {
    // free memory as this is not Angular managed Observable
    this.subscription.unsubscribe();
  }

}
