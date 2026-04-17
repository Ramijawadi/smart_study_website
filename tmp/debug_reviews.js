const URL = 'https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJzZdRQi7Z6IMRaHxtsC2h2dw&fields=reviews,rating,user_ratings_total&language=fr&reviews_sort=newest&key=AIzaSyDibmUvLFxqRU8B9XN882lkqPZqdOIFdkI';

async function test() {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(err);
  }
}

test();
