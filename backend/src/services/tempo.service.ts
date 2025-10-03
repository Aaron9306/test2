import axios from "axios";

export async function fetchTempo(lat: number, lng: number) {
  // Example: use NASA TEMPO API, fallback to demo data if error
  try {
    const url = `${process.env.TEMPO_BASE_URL}/data?lat=${lat}&lng=${lng}`;
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.TEMPO_API_KEY}` }
    });
    // Parse and map to unified structure
    return {
      pm25: res.data.pm25 ?? 10,
      no2: res.data.no2 ?? 12,
      ozone: res.data.ozone ?? 0.03,
      aqi: res.data.aqi ?? 80
    };
  } catch {
    // fallback: synthetic data
    return { pm25: 10, no2: 12, ozone: 0.03, aqi: 80 };
  }
}