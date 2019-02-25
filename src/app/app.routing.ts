import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { PlaygroundComponent } from './playground/playground.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ListStartComponent } from './shopping-list/list-start/list-start.component';
import { ListEditComponent } from './shopping-list/list-edit/list-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: LandingPageComponent },
  { path: 'playground', component: PlaygroundComponent },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    children: [
      { path: '', component: ListStartComponent },
      { path: 'new', component: ListEditComponent },
      { path: ':name', component: ListEditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
