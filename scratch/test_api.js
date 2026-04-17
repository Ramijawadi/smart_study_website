const fetch = require('node-fetch');

const PLACE_ID = 'ChIJzZdRQi7Z6IMRaHxtsC2h2dw';
const API_KEY = 'AIzaSyDibmUvLFxqRU8B9XN882lkqPZqdOIFdkI';

async function test() {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&language=fr&reviews_sort=newest&key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('Status:', data.status);
    if (data.result) {
      console.log('Rating:', data.result.rating);
      console.log('Total Reviews:', data.result.user_ratings_total);
      console.log('Reviews Count:', data.result.reviews ? data.result.reviews.length : 0);
      if (data.result.reviews) {
        data.result.reviews.slice(0, 5).forEach((r, i) => {
          console.log(`Review ${i+1}: ${r.author_name} - ${r.rating} - ${r.relative_time_description}`);
        });
      }
    } else {
      console.log('Error Message:', data.error_message);
    }
  } catch (err) {
    console.error(err);
  }
}

test();
