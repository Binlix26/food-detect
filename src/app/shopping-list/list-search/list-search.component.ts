import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-list-search',
  templateUrl: './list-search.component.html',
  styleUrls: ['./list-search.component.css']
})
export class ListSearchComponent implements OnInit {
  @ViewChild('searchbox') searchbox: ElementRef;

  constructor(private slService: ShoppingListService) {}

  ngOnInit() {}

  onInputChange(event: Event) {
    const term = this.searchbox.nativeElement.value.trim().toLowerCase();
    console.log(term);
    this.slService.searchItem(term);
  }

  onReset() {
    this.searchbox.nativeElement.value = '';
    this.slService.restoreItems();
  }
}
