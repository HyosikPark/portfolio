## Shoppingmall

<h3>I proceeded to understand the JavaScript-based web operating principle.</h3>

## Tech

1. React </br>
2. React-Redux </br>
3. React-Router-Dom</br>
4. js-Cookie</br>
5. NodeJS</br>
6. MongoDB </br>
7. Express </br>

## npm start

#### 1. install MongoDB

https://docs.mongodb.com/manual/administration/install-community/</br>

#### 2. Run Backend

`$ cd backend`</br>
`$ npm start`

#### 3. Run frontend

`$ cd frontend`</br>
`$ npm start`

## Skill

1. The home page lists all the products in order of recent uploads, and you can click the menu bar to view the products classified by category.</br>
   Information on id, price, brand, etc. of the product was first designed with api, received, and the front was designed with mongoDB schema model.

2. You can create, modify, and delete products by communicating REST API on products path at login. The data saved in the Redux store was saved in the cookie to remember the product information entered when modified and to appear in the input box.
   Authenticate login with token and save user information in cookie.

3. If the product is out of stock, it cannot be put in cart, and the quantity and price of the product in cart are added to js reduce property, and if you enter all shipping information, you will go through the final confirmation process before ordering.

## Video

https://www.youtube.com/watch?v=rCCijOgaG7w&t=16s

## Reference

opensource: https://github.com/basir/node-react-ecommerce
