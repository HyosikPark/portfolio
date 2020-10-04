import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { savePayment } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = (props) => {
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    dispatch(savePayment({ paymentMethod }));
    props.history.push('/placeorder');
  };

  const backHandler = () => {
    props.history.push('/shipping');
  };

  return (
    <>
      <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className='form'>
          <form onSubmit={submitHandler}>
            <ul className='form-container'>
              <li>
                <h2>Payment</h2>
              </li>
              <li>
                <div>
                  <input
                    type='radio'
                    checked
                    name='paymentMethod'
                    id='paymentMethod'
                    value='paypal'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label htmlFor='address'>Paypal</label>
                </div>
              </li>
              <li>
                <button type='submit' className='button primary'>
                  Continue
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
