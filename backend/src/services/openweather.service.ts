import axios from "axios";

export async function fetchWeather(lat: number, lng: number) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.OPENWEATHER_API_KEY}`;
  const res = await axios.get(url);
  return res.data;
}