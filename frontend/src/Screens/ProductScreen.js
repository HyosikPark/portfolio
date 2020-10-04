import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
  }, []);

  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?Qty=${qty}`);
  };

  return (
    <div>
      <div className='back-to-result'>
        <Link to='/'>Back to Result</Link>
      </div>
      {loading ? (
        <div>...loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='details'>
          <div className='details-image'>
            <img src={product.image} alt='product' />
          </div>
          <div className='details-info'>
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Starts ({product.numReviews} Reviews)
              </li>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className='details-action'>
            <ul>
              <li>Price: {product.price}</li>
              <li>
                Status:{' '}
                {product.countInStock > 0 ? (
                  <span style={{ color: 'blue' }}>In Stock</span>
                ) : (
                  <span style={{ color: 'red' }}>Out of Stock</span>
                )}
              </li>
              <li>
                qty:{' '}
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart} className='button primary'>
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
