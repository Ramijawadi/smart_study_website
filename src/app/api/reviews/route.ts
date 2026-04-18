import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const PLACE_ID = 'ChIJzZdRQi7Z6lMRaHxtsC2h2dw';
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function GET() {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews,rating,user_ratings_total&language=fr&reviews_sort=newest&key=${API_KEY}`;

    const res = await fetch(url, { next: { revalidate: 60 } }); // cache for 1 minute for more dynamic updates
    const data = await res.json();

    if (data.status !== 'OK') {
      console.error('Google API Error:', data.status, data.error_message);
      return NextResponse.json({ error: data.status, message: data.error_message }, { status: 400 });
    }

    const reviews = (data.result.reviews || []).map((r: {
      author_name: string;
      rating: number;
      text: string;
      relative_time_description: string;
      time: number;
      profile_photo_url?: string;
    }) => ({
      name: r.author_name,
      rating: r.rating,
      text: r.text,
      date: r.relative_time_description,
      timestamp: r.time,
      photo: r.profile_photo_url || null,
    })).slice(0, 5);

    return NextResponse.json({
      reviews,
      rating: data.result.rating,
      total: data.result.user_ratings_total,
    });
  } catch (error) {
    // Fallback data in case of catch error
    return NextResponse.json({
      reviews: [
        { name: "Bokh Crypto", rating: 5, text: "Na9ra t9oul fi darna", date: "il y a 4 jours", photo: null },
        { name: "Ben Ahmed Youssfi", rating: 5, text: "Espace jolie", date: "il y a 5 jours", photo: null },
        { name: "bouthayna amri", rating: 5, text: "يعطيكم الصحة", date: "il y a une semaine", photo: null },
        { name: "Essia Bouazizi", rating: 5, text: "Clean, comfortable, and well-equipped. Highly recommend !", date: "il y a une semaine", photo: null },
        { name: "Yesser Ajil", rating: 5, text: "Ahlaa w a9waa co fl mestiir w ahla sohayb ❤️", date: "il y a une semaine", photo: null }
      ],
      rating: 5.0,
      total: 142
    });
  }
}
