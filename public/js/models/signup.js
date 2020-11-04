/* eslint-disable */
import axios from 'axios';
import { showAlert } from './../views/alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Signed up successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};

export const reset = async (token, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/resetPassword/${token}`,
      data: {
        password,
        passwordConfirm
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Password changed successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};

export const emailMe = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/users/forgotPassword`,
      data: {
        email
      }
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        showAlert('success', 'Reset Email Has Been Sent To You Email');
      }, 3000);
    }
  } catch (err) {
    console.log(err.response.data.message);
    showAlert('error', err.response.data.message);
  }
};

export const askQuery = async (name, email, phone, query) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/query',
      data: {
        name,
        email,
        phone,
        query
      }
    });

    if (res.data.status === 'success') {
      showAlert(
        'success',
        'Your query has been sent! we will reach you out shortly'
      );
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
