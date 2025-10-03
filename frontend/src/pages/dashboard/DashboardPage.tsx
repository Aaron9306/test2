import React from "react";
import OverviewCard from "../../components/Dashboard/OverviewCard";
import AQIMap from "../../components/Dashboard/AQIMap";
import TimeSeriesChart from "../../components/Dashboard/TimeSeriesChart";
import RoleRecommendationPanel from "../../components/Dashboard/RoleRecommendationPanel";
import DeviceList from "../../components/Device/DeviceList";
import { Box } from "@mui/material";

const DashboardPage: React.FC = () => (
  <Box sx={{ maxWidth: 960, mx: "auto", my: 2 }}>
    <OverviewCard aqi={82} />
    <AQIMap />
    <TimeSeriesChart />
    <RoleRecommendationPanel />
    <DeviceList />
  </Box>
);

export default DashboardPage;