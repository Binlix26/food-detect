# Food-detection

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Tools
1. Angular 
2. [Clarifai API - Food Model](https://clarifai.com/models)
3. [Alyle UI](https://alyle-ui.firebaseapp.com/)

## Feature
1. Submit an food mage url (with fine resolution), possible ingredients will be returned. When the image has nothing to do with           food, predictions of ingredients would still be returned which is bad and funny - not my fault :)
    
2. User can delete the ingredients in the list located in the 'playground', also can add the ingredient to the shopping list.
3. User can delete the ingredients from the shopping list.

## Improvements

### Playground
1. Add 'adding all of the ingredients to the shopping list' methond.
2. Add loading icon to provide a better user experience when the app fecthes the data.

### Shopping List
1. Add search, add new and edit functions.
2. Fetch images and description of the ingredients by name (placeholder at the moment).
3. adding functions for the two icons that do nothing currently.

## Issues
1. When the user clicks 'Try it' to get to the plaground, the Navigation Bar is not actived.
2. Have error handler to handle error such as 400 bad request, but have no user notification.

## Solutions
1. Tried changing the Alyle UI component to utilise 'routerLinkActive' without any success, probably need to listen to dynamicly pass 'selectedIndexChange' which is @Input describled in Alyle Tab API.
2. Set up a global Logging/Messaging service to provide a better user expereince, espetially when users enter a bad image     url.

