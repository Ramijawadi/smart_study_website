const fetch = require('node-fetch');

const PLACE_ID = 'ChIJzZdRQi7Z6lMRaHxtsC2h2dw';
const API_KEY = 'AIzaSyDibmUvLFxqRU8B9XN882lkqPZqdOIFdkI';

async function test() {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&language=fr&reviews_sort=newest&key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log('Status:', data.status);
    if (data.status === 'OK' && data.result) {
      console.log('Rating:', data.result.rating);
      console.log('Total Reviews:', data.result.user_ratings_total);
      if (data.result.reviews) {
        console.log('Reviews Count (API returned):', data.result.reviews.length);
        data.result.reviews.slice(0, 5).forEach((r, i) => {
          console.log(`Review ${i+1}: ${r.author_name} - ${r.rating} - ${r.relative_time_description}`);
        });
      } else {
        console.log('No reviews found in the result.');
      }
    } else {
      console.log('API Error:', data.status);
      console.log('Error Message:', data.error_message);
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

test();
