/* eslint-disable */

import axios from 'axios';
import { showAlert } from './../views/alerts';

export const bookMusic = async (musicId) => {
  try {
    // 1) Get Checkout session from api

    const session = await axios({
      method: 'POST',
      url: `/api/v1/bookings/${musicId}/orders`
    });

    // 2) Create checkout form + charge credit card

    const res = session.data.data;

    const options = {
      amount: `${res.amount}`,
      key: 'rzp_test_sonpOh4fsRPf0i',
      name: 'CIC PICTURES',
      description: `This is premium version of ${res.notes.musicName}`,
      image: 'https://i.ibb.co/VHLcgct/CIC-PICTURES-W-R.png',
      order_id: `${res.id}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        try {
          await axios({
            method: 'POST',
            url: `/api/v1/billing/razorpay_payment_id/${response.razorpay_payment_id}/razorpay_order_id/${response.razorpay_order_id}/razorpay_signature/${response.razorpay_signature}/musicId/${musicId}`
          });

          location.assign(res.notes.premium);
          showAlert('success', 'Music is being started downloading');
        } catch (err) {
          showAlert('error', err.response.data.message);
        }
      },
      prefill: {
        name: `${res.notes.userName}`,
        email: `${res.notes.userEmail}`
      },
      notes: {
        address: 'CIC PICTURES PVT LTD.'
      },
      theme: {
        color: '#F37254'
      }
    };

    // console.log(options);

    const rzp1 = new Razorpay(options);

    rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata);
    });

    rzp1.open();
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
