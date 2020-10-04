import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import CheckoutSteps from '../components/CheckoutSteps';

const SigninScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading, userInfo, error } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <>
      {props.location.search && <CheckoutSteps step1></CheckoutSteps>}
      <div className='form'>
        <form onSubmit={submitHandler}>
          <ul className='form-container'>
            <li>
              <h2>Sign-In</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </li>
            <li>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                name='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </li>
            <li>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </li>
            <li>
              <button type='submit' className='button primary'>
                Signin
              </button>
            </li>
            <li>New to shopping mall?</li>
            <li>
              <Link
                to={
                  redirect === '/'
                    ? 'register'
                    : `register?redirect=${redirect}`
                }
                className='button secondary text-center'
              >
                Create your account
              </Link>
            </li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default SigninScreen;
