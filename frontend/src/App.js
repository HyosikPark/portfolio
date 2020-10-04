import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import ProductScreen from './Screens/ProductScreen';
import HomeScreen from './Screens/HomeScreen';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProductsScreen from './Screens/ProductsScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import CategoryScreen from './Screens/CategoryScreen';
import Navbar from './Screens/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Navbar />
        <main className='main'>
          <div className='content'>
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/products' component={ProductsScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/signin' component={SigninScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/' exact component={HomeScreen} />
            <Route path='/category/:id' component={CategoryScreen} />
          </div>
        </main>
        <footer className='footer'></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
