/* eslint-disable */
import axios from 'axios';

export const music = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/music'
    });

    if (res.data.status === 'success') {
      const result = res.data.data.doc;
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const musicDevotional = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/music/Devotional'
    });

    if (res.data.status === 'success') {
      const result = res.data.data.doc;
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const musicGhazal = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/music/Ghazals'
    });

    if (res.data.status === 'success') {
      const result = res.data.data.doc;
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const musicBhojpuri = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/music/Bhojpuri'
    });

    if (res.data.status === 'success') {
      const result = res.data.data.doc;
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};

export const musicKaraoke = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/music/Karaoke'
    });

    if (res.data.status === 'success') {
      const result = res.data.data.doc;
      return result;
    }
  } catch (err) {
    console.log(err);
  }
};
