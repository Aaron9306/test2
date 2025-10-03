import axios from "axios";

export async function fetchOpenAQ(lat: number, lng: number, radiusKm = 10) {
  const url = `${process.env.OPENAQ_BASE}/measurements?coordinates=${lat},${lng}&radius=${radiusKm * 1000}&limit=100`;
  const res = await axios.get(url);
  return res.data;
}