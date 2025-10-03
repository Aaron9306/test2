import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import AirIcon from "@mui/icons-material/Air";
import { useUserStore } from "../../stores";

const OverviewCard: React.FC<{ aqi?: number }> = ({ aqi = 80 }) => {
  const user = useUserStore(s => s.user);
  return (
    <Paper className="glass-card" sx={{ display: "flex", alignItems: "center" }}>
      <AirIcon sx={{ fontSize: 46, color: "primary.main", mr: 2 }} />
      <Box>
        <Typography variant="h5">AQI: {aqi}</Typography>
        <Typography variant="body2">
          {aqi <= 50
            ? "Good air quality"
            : aqi <= 100
            ? "Moderate"
            : "Unhealthy"}
          {user && ` for ${user.role}`}
        </Typography>
      </Box>
    </Paper>
  );
};

export default OverviewCard;