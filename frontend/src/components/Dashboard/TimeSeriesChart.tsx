import React, { useEffect, useState } from "react";
import { Paper, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getHistory, Observation } from "../../api/dataApi";

const defaultPos = { lat: 32.7767, lng: -96.7970 };

const TimeSeriesChart: React.FC = () => {
  const [data, setData] = useState<Observation[]>([]);

  useEffect(() => {
    const now = new Date();
    const from = new Date(now.getTime() - 3 * 3600 * 1000).toISOString();
    getHistory(defaultPos.lat, defaultPos.lng, from, now.toISOString()).then(res =>
      setData(res.observations)
    );
  }, []);

  return (
    <Paper className="glass-card">
      <Typography variant="h6">Pollutants (Past 3h)</Typography>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <XAxis dataKey="timestamp" tickFormatter={v => new Date(v).getHours() + ":00"} />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="pm25" stroke="#0ea5ff" name="PM2.5" />
          <Line type="monotone" dataKey="no2" stroke="#7c3aed" name="NO₂" />
          <Line type="monotone" dataKey="ozone" stroke="#facc15" name="O₃" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default TimeSeriesChart;