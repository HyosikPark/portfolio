import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

const CategoryScreen = (props) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, []);
  return loading ? (
    <div>...loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <ul className='products'>
      {products.reverse().map(
        (product) =>
          product.category === props.match.params.id && (
            <li key={product._id}>
              <div className='product'>
                <Link className='product-name' to={`/product/${product._id}`}>
                  <img
                    className='product-image'
                    src={product.image}
                    alt='product'
                  />

                  {product.name}
                </Link>
                <div className='product-brand'>brand: {product.brand}</div>
                <div className='product-price'>${product.price}</div>
                <div className='product-rating'>
                  {product.rating} Stars ({product.numReviews})
                </div>
              </div>
            </li>
          )
      )}
    </ul>
  );
};

export default CategoryScreen;
