import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteProduct,
  listProducts,
  saveProduct,
} from '../actions/productActions';
import { signin } from '../actions/userActions';

const ProductsScreen = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [numReviews, setNumReviews] = useState('');

  const { loading, products, error } = useSelector(
    (state) => state.productList
  );

  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = useSelector((state) => state.productDelete);

  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = useSelector((state) => state.productSave);
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setRating(product.rating);
    setNumReviews(product.numReviews);
    setDescription(product.description);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };
  console.log(category);

  return (
    <>
      <div className='content content-margined'>
        <div className='product-header'>
          <h3>Products</h3>
          <button className='button primary' onClick={() => openModal({})}>
            Create Product
          </button>
        </div>
        {modalVisible && (
          <div className='form'>
            <form onSubmit={submitHandler}>
              <ul className='form-container'>
                <li>
                  <h2>Create Product</h2>
                </li>
                <li>
                  {loadingSave && <div>Loading...</div>}
                  {errorSave && <div>{errorSave}</div>}
                </li>
                <li>
                  <label htmlFor='name'>Name</label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor='price'>Price</label>
                  <input
                    type='text'
                    name='price'
                    id='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor='image'>Image</label>
                  <input
                    type='text'
                    name='image'
                    id='image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor='brand'>Brand</label>
                  <input
                    type='text'
                    name='brand'
                    id='brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor='counutInStock'>Counut In Stock</label>
                  <input
                    type='text'
                    name='counutInStock'
                    id='counutInStock'
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </li>
                <li>
                  <label htmlFor='category'>Category</label>
                  <div>
                    <input
                      type='radio'
                      checked={category === 'shirts'}
                      name='category'
                      id='category'
                      value='shirts'
                      onChange={(e) => setCategory(e.target.value)}
                    />{' '}
                    Shirts
                    <input
                      type='radio'
                      checked={category === 'pants'}
                      name='category'
                      id='category'
                      value='pants'
                      onChange={(e) => setCategory(e.target.value)}
                    />{' '}
                    Pants
                  </div>
                </li>
                <li>
                  <label htmlFor='description'>Description</label>
                  <textarea
                    type='text'
                    name='description'
                    id='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </li>
                <li>
                  <button type='submit' className='button primary'>
                    {id ? 'Update' : 'Create'}
                  </button>
                </li>
                <li>
                  <button
                    type='submit'
                    onClick={() => setModalVisible(false)}
                    className='button secondary'
                  >
                    Back
                  </button>
                </li>
              </ul>
            </form>
          </div>
        )}
        <div className='product-list'>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.reverse().map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button
                      className='button'
                      onClick={() => openModal(product)}
                    >
                      Edit
                    </button>{' '}
                    <button
                      className='button'
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsScreen;
