import React, { useState } from "react";
import { Paper, Typography, Button, CircularProgress, Box } from "@mui/material";
import { useUserStore } from "../../stores";
import { apiClient } from "../../utils/api";

const RoleRecommendationPanel: React.FC = () => {
  const user = useUserStore(s => s.user);
  const [recommendation, setRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendation = async () => {
    setLoading(true);
    try {
      const res = await apiClient.post("/ai/recommendation", {
        userRole: user?.role,
        healthInfo: user?.healthInfo,
        current: {}, // TODO: pass real data
        forecast: []
      });
      setRecommendation(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper className="glass-card">
      <Typography variant="h6">AI Recommendations</Typography>
      <Box my={2}>
        {loading ? (
          <CircularProgress />
        ) : recommendation ? (
          <>
            <Typography variant="subtitle1">{recommendation.action}</Typography>
            <Typography variant="body2">{recommendation.reason}</Typography>
            <Typography variant="caption" color="primary">
              {recommendation.message_for_user}
            </Typography>
            <Typography variant="caption" color="secondary">
              Confidence: {recommendation.confidence}
            </Typography>
          </>
        ) : (
          <Typography>Click to get personalized advice.</Typography>
        )}
      </Box>
      <Button variant="contained" onClick={fetchRecommendation} disabled={loading}>
        Get Recommendation
      </Button>
    </Paper>
  );
};

export default RoleRecommendationPanel;