import { LyCommonModule, LyThemeModule, LY_THEME } from '@alyle/ui';
import { LyAvatarModule } from '@alyle/ui/avatar';
import { LyButtonModule } from '@alyle/ui/button';
import { LyCardModule } from '@alyle/ui/card';
import { LyFieldModule } from '@alyle/ui/field';
import { LyGridModule } from '@alyle/ui/grid';
import { LyIconModule } from '@alyle/ui/icon';
import { LyListModule } from '@alyle/ui/list';
import { LyTabsModule } from '@alyle/ui/tabs';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { LyTooltipModule } from '@alyle/ui/tooltip';
import { LyTypographyModule } from '@alyle/ui/typography';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FoodDetectionComponent } from './playground/food-detection/food-detection.component';
import { IngredientListComponent } from './playground/ingredient-list/ingredient-list.component';
import { PlaygroundComponent } from './playground/playground.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavigationComponent,
    PlaygroundComponent,
    FoodDetectionComponent,
    IngredientListComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LyThemeModule.setTheme('minima-light'),
    LyTabsModule,
    LyTypographyModule,
    LyButtonModule,
    LyFieldModule,
    LyIconModule,
    LyGridModule,
    LyListModule,
    LyAvatarModule,
    LyTooltipModule,
    LyCommonModule,
    LyCardModule,
  ],
  providers: [{ provide: LY_THEME, useClass: MinimaLight, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
