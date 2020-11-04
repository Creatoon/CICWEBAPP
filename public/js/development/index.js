/* eslint-disable */
import '@babel/polyfill';

// importing models

import {
  music,
  musicDevotional,
  musicBhojpuri,
  musicKaraoke,
  musicGhazal
} from './../models/musicModel';
import { login, logout } from './../models/login';
import { emailMe, reset, askQuery, signup } from './../models/signup';
import { bookMusic } from './../models/stripe';

//importing views

import { search, renderMusic } from './../views/musicView';

//importing elements
const loginForm = document.querySelector('.form--login');
const emailForm = document.querySelector('.form--email');
const logOutBtn = document.querySelectorAll('.nav-user-logout');
const forgotForm = document.querySelector('.form--forgot');
const signupForm = document.querySelector('.form--signup');
const searchBar = document.getElementById('searchBar');
const queryForm = document.querySelector('.form--query');

if (searchBar) {
  document.addEventListener('keyup', () => {
    const searchContainer = document.querySelector('.searchContainer');
    if (document.activeElement === searchBar) {
      search(searchBar, searchContainer);
    }
  });
}

if (document.querySelector('.searchContainer')) {
  document.querySelector('.searchContainer').addEventListener('click', (e) => {
    if (e.target.className === 'buy-button') {
      const musicId = e.target.dataset.musicid;
      bookMusic(musicId);
    }
  });
}

const Normal = document.querySelector('.Normal');
const Ghazals = document.querySelector('.Ghazals');
const Bhojpuri = document.querySelector('.Bhojpuri');
const Karaoke = document.querySelector('.Karaoke');
const Devotional = document.querySelector('.Devotional');

const el = Normal || Ghazals || Karaoke || Bhojpuri || Devotional;

if (el) {
  const musicContainer = document.querySelector('.musicContainer');

  const result = async () => {
    let res;

    if (el === Ghazals) {
      res = await musicGhazal();
    }
    if (el === Normal) {
      res = await music();
    }
    if (el === Karaoke) {
      res = await musicKaraoke();
    }
    if (el === Bhojpuri) {
      res = await musicBhojpuri();
    }
    if (el === Devotional) {
      res = await musicDevotional();
    }

    res.forEach((musi) => {
      renderMusic(musicContainer, musi);
    });

    const buyButton = document.querySelectorAll('.buy-button');

    if (buyButton) {
      buyButton.forEach((but) => {
        but.addEventListener('click', async (e) => {
          e.preventDefault();

          e.target.textContent = 'Processing...';
          const musicId = e.target.dataset.musicid;
          bookMusic(musicId);
          e.target.textContent = 'Buy Full Audio';
        });
      });
    }
  };

  result();
}

// login and logout button
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;

    signup(name, email, password, passwordConfirm);
  });
}

if (forgotForm) {
  forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const token = window.location.pathname.split('resetPassword/')[1];

    reset(token, password, passwordConfirm);
  });
}

if (queryForm) {
  queryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('number').value;
    const query = document.getElementById('query').value;

    askQuery(name, email, phone, query);
  });
}

if (emailForm) {
  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    emailMe(email);
  });
}

if (logOutBtn) {
  logOutBtn.forEach((el) => {
    el.addEventListener('click', () => {
      logout();
    });
  });

  return false;
}
