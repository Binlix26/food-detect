import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  
  items: Ingredient[] = [];
  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.items = this.slService.getItems();
    this.subscription = this.slService.itemsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.items = ingredients;
      }
    );
  }

  onItemSelect(index: number): void {
    const param = this.items[index].name;
    this.router.navigate([`${param}`], { relativeTo: this.activatedRoute });
  }

  onDelete(ingredient: Ingredient): void {
    this.slService.deleteItem(ingredient);
  }

  onAddNew(): void {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    // free memory as this is not Angular managed Observable
    this.subscription.unsubscribe();
  }
}
