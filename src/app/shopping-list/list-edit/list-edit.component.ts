import { LyTheme2, ThemeVariables } from '@alyle/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

const STYLES = (_theme: ThemeVariables) => ({
  container: {
    maxWidth: '320px'
  }
});

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  readonly classes = this.theme.addStyleSheet(STYLES);

  ingredientName: string;
  editMode = false;
  ingredientForm: FormGroup;

  constructor(
    private theme: LyTheme2,
    private slService: ShoppingListService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ingredientForm = null;
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.ingredientName = params.get('name');
      this.editMode = this.ingredientName != null;
      this.initForm();
      console.log('Edit Mode', this.editMode);
      console.log('ParamMap', this.ingredientName);
    });
    // this.ingredientName = this.activatedRoute.snapshot.paramMap.get('name');
    // this.editMode = this.ingredientName != null;
    // this.initForm();
    // console.log('Edit Mode', this.editMode);
    // console.log('ParamMap', this.ingredientName);
  }

  onSubmit() {
    const id = Math.floor(Math.random() * 100);
    const iName = this.name.value.trim().toLowerCase();
    const iDesc = this.desc.value.trim() || '';
    const newIngredient = new Ingredient(id, iName, iDesc);

    if (!iName) {
      return;
    }

    if (this.editMode) {
      this.slService.updateItem(newIngredient);
    } else {
      this.slService.addItem(newIngredient);
    }
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  // getter, used for error message
  get name() {
    return this.ingredientForm.get('name');
  }

  // getter, used for error message
  get desc() {
    return this.ingredientForm.get('desc');
  }

  private initForm(): void {
    let inName = '';
    let inDesc = '';
    // TODO test edit mode, enable item click
    if (this.editMode) {
      const ingredient = this.slService.getItemByName(this.ingredientName);
      if (ingredient) {
        inName = ingredient.name;
        inDesc = ingredient.desc;
      }
    }

    this.ingredientForm = new FormGroup({
      name: new FormControl(inName, Validators.required),
      desc: new FormControl(inDesc, Validators.maxLength(20))
    });
  }
}
