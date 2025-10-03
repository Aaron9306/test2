import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getNearby, Observation } from "../../api/dataApi";
import { CircularProgress } from "@mui/material";

const defaultPos: [number, number] = [32.7767, -96.7970];

const AQIMap: React.FC = () => {
  const [obs, setObs] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try geolocation
    navigator.geolocation.getCurrentPosition(
      async pos => {
        const { latitude, longitude } = pos.coords;
        const res = await getNearby(latitude, longitude, 5);
        setObs(res.observations);
        setLoading(false);
      },
      async () => {
        const res = await getNearby(defaultPos[0], defaultPos[1], 5);
        setObs(res.observations);
        setLoading(false);
      }
    );
  }, []);

  return (
    <div style={{ height: 320, marginBottom: 16 }}>
      <MapContainer center={defaultPos} zoom={10} style={{ height: "100%", borderRadius: 16 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {loading ? (
          <CircularProgress
            sx={{ position: "absolute", top: "50%", left: "50%", zIndex: 1000 }}
          />
        ) : (
          obs.map((o, i) => (
            <CircleMarker
              key={i}
              center={[o.lat, o.lng]}
              radius={10 + (o.aqi ?? 50) / 20}
              pathOptions={{
                color:
                  o.aqi <= 50
                    ? "#0ea5ff"
                    : o.aqi <= 100
                    ? "#7c3aed"
                    : "#ef4444",
                fillOpacity: 0.7
              }}
            >
              <Tooltip>
                AQI: {o.aqi}
                <br />
                PM2.5: {o.pm25}
              </Tooltip>
            </CircleMarker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

export default AQIMap;