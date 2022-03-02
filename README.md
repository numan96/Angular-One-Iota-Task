# Numan One Iota Task

## Live Website
https://ng-numan-oneiota-task.web.app/

## Third Party Dependencies Used

- Angularfire for Deployment/Hosting Only - https://github.com/angular/angularfire
- Angular Material for UI components - https://material.angular.io/
- Angular Flex-Layout for UI layout - https://github.com/angular/flex-layout

## Requirements Given

The task was to create a web application that displays products, similar to many ecommerce apps and websites.

- Show a list of products
  - Display only the key details about each product
- Click a product in the list to go to a single product details page
  - All details for that product should be included
- Show a list of recently viewed products at the bottom of each page
- Add products to a cart
  - A separate basket page with a cart total and list of products
  - A cart icon with a running count of the number of products

**All requirements were implemented and feedback was all very positive.**

## Design Decisions and Building the Application

### Angular Material 
I decided on Angular Material as this is a dependecy I have the most familiarity with, therefore, this meant I had the best possibility and amount of time to implement all of the functionality whilst using user friendly components. It provided visually appealing UI elements whilst also allowing consistency of design throughout the application. 

### Angular Flex Layout
I decided on Flex Layout, though I was still in the learning stages of implementing it, it allowed me to create user friendly layouts within the UI as it can specify different layouts, sizing, viewport sizes, and display devices. Though it works independently of Angular Material, it also works really well alongside it. I ended up with a layout that is dynamic to most screen sizes and both mobile/web layouts still look visually appealing whilst also being consistent and smooth in transition.

### Firebase Hosting
This is a hosting method I am familiar with and it allowed me to host the final application with no hassle or delay. I had used Netlify recently for a personal project and it had broken the routing within my application, this was an issue I did not wish to have arise so I opted to host using Firebase, which my previous applications are also using.

### Routing and Seperate Modules
I chose for the products page to be the homepage of the application and to handle when users attempt to navigate to a page that doesn't exist, I opted to redirect them back to this products page. I decided to split the Products Module and the routing of the Products as it would declutter the App Module and it keeps the functionality related to the products only. This was also the intention with the seperated Shared Module which houses the imports for the header and recently viewed products component.


### Data Service
Data was intended to be dynamic, therefore I implemented a Service which housed the main API endpoint to fetch the product data, which throughout the application, provided different data sets with entries. Through the use of Dependency Injection, this allowed for more modularity in my application and less clutter instead of the same method being written in multiple components. 

It contains an array of shopping cart products, which are any products the user has chose to add to their cart, with values such as quantity and size. It also contains an array of recently viewed products which are products that are added everytime a user clicks onto a products details page, it stores 5 products and once full, pushes an entry out and adds the new product in. Their is a Behaviour Subject that controls the number shown in the icon of the shopping cart, notifying the user of how many products are present in the cart, this is also dynamically changing as users add/remove products from their shopping cart. A Behaviour Subject was used as this holds one value whereas a Subject doesn't hold a value. This Behaviour Subject was subscribed to in the header to make it dynamic and always react to the .next calls in the service. 

'getProducts' method in the service returns the results from the API endpoint and stores them into an array of Products. The 'getProductDetails' method returned an array only containing the product that matched the ID of the current product details page the user has navigated to. 'getCartProducts' was used to return the cart products array to the cart page and store it into an array there to show the products information in the template. The 'addProductToCart' method was called by the product details page, the id, size and quantity were stored into constants as I would later use them to loop through the current products of the cart and determine whether the product was already present, so it just needed the quantity updated, or if the product was not yet in the cart and was needed to be pushed into the cartProducts array. In this method, the cart icons value in the header was also updated by calling the next on cartCount. 'removeProductFromCart' was similar however it would subtract the quantity by 1 or if the quantity was about to hit 0, the product was removed from the cartProducts array with a splice. 'getRecentlyViewedProducts' returned the corresponding array for the recently viewed products component to display. Lastly, the 'addToRecentlyViewed' method stored the id, name, image and price into a constant which then was pushed into the recently viewed product array, if the array had not reached the 5 entry limit and/or the product was already present in the array. I decided to not allow for multiple of the same product within this as it gave the opportunity for the user to see a greater quantity of products rather than 5 of the same which wouldn't draw much attention to the other products.

### Models
Models allowed me to use strict type definitions and track errors more efficiently, one was created for Products coming from the API, Cart Products, Recently Viewed Products and Price to allow me to call the amount and currency keys from the Price Object.

### Header and Recently Viewed Products
The header was created using an Angular Material toolbar which provided a link back to the homepage with the 'One Iota' text and it allowed navigation to the shopping cart page with the shopping cart icon button which also provided a dynamic number of how many products were present in the cart. The typescript file contained a number which is displayed in the template and updated to match the cartCount BehaviourSubject value via subscription from the service.

The recently viewed products is a list of the recently viewed products with simple data shown such as the name and price of the products. The price used a Currency built in Pipe to show the price in the currency provided from the API. The typescript file contained a Recent Product array that was structured after the Recent Product model and this data was retrieved from the service (getRecentlyViewedProducts method) within the ngOnInit.

These 2 components need to be present on every page therefore they were added to the app component template.

### Products and Product Details
The products page contains a list of products presented in Angular Material cards, once clicked, these navigate to the corresponding products details page. The Products component typescript file contains a products list which is updated with the API products from the service. There is also the method to add to recently viewed products which is called when the user clicks on the card (navigates to the products details page).

The Product Details component template shows the product information and an image of the product, aswell as having a Reactive Form which, upon submitting, adds the product to the users cart. Validation such as type number for quantity and dynamic select options with the product sizes from the API are provided. The price also uses a Currency pipe to provide the price in the products given currency from the API. The button for the form is disabled if the form is not valid. The components typescript file contains the current Product array and also declares a FormGroup that is initiated in the 'initForm' method. New FormControls are declared that are given the values from the current products array and also the users given values for size and quantity. These also declare validation for sizes to ensure it is given by the user before allowing the form to be submit, as is the same with quantity. The 'getProduct' method is initially called to retrieve the product details for the product which has its id present in the router parameters. An Angular Material snackbar is called in the 'addToCart' to ensure the process of adding products is clear to the user, this pops up and can be dismissed by the user but ensures the UI is clearly showing what functionality is happening. Also within the 'addToCart' method, the Product Form is reset and initialised again to ensure the minimisation of errors with the data being sent to the service.

### Shopping Cart
The shopping cart is a list of shopping cart products displaying key information required for the user before checkout, it allows the user to remove the products from the cart (this will reduce the quantity by 1 or remove the product if quantity is already set to 1). These are presented in Angular Material cards to distinctly display their are seperate products in the order. It also provides the price of the total order which is dynamic as products are removed/added.

The component typescript file contains the cartProducts array which handles the list of products added by the user and it is retrieved with the 'getCartProducts' method called on ngOnInit, this method retrieves an array from the service and also calls the 'getCartTotal' method, which is a number starting at 0, which then maps each products total price to the shopping carts total price, creating the final sum total of the cart. There is also an Angular snackbar called upon removing from the cart with the 'removeFromCart' method, this is to clearly show the functionality being done for the user, ensuring they understand a product has been removed from their cart and the array.

### Design

I went about creating the skeleton of the web application first, creating the folders and components needed based on the functionality from the specification, then implementing the routing for the application. Once this was designed, I aimed to fetch the data successfully from the API with the use of a service and HttpClient provider. I started with a very basic design of the application aiming to have all functionality working before having the UI designed and be responsive. 

The UI uses breakpoints from Angular Flex Layout which creates the mobile friendly interface I ended up with. Most rows in the web application turn into columns when close to mobile dimensions. The interface is consistent on both web and mobile, aiming to be fast and easy to navigate whilst also having a familiar ecommerce feeling to it.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
