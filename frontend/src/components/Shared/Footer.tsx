import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => (
  <Box sx={{ mt: 3, mb: 1, textAlign: "center", color: "grey.400" }}>
    <Typography variant="caption">© 2025 Air Quality Dashboard</Typography>
  </Box>
);

export default Footer;