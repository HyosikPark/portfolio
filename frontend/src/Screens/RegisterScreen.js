import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';

const RegisterScreen = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const { loading, userInfo, error } = useSelector(
    (state) => state.userRegister
  );
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
    dispatch(register(name, email, password));
  };

  return (
    <div className='form'>
      <form onSubmit={submitHandler}>
        <ul className='form-container'>
          <li>
            <h2>Create Account</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor='name'>name</label>
            <input
              type='text'
              name='name'
              id='name'
              onChange={(e) => setName(e.target.value)}
            />
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
            <label htmlFor='rePassword'>Re-Enter Password</label>
            <input
              type='Password'
              id='rePassword'
              name='rePassword'
              onChange={(e) => setRePassword(e.target.value)}
            />
          </li>
          <li>
            <button type='submit' className='button primary'>
              Register
            </button>
          </li>
          <li>
            Already have an account?{' '}
            <Link
              to={redirect === '/' ? 'signin' : `siginin?redirect=${redirect}`}
              className='button secondary text-center'
            >
              Create your account
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
};

export default RegisterScreen;
