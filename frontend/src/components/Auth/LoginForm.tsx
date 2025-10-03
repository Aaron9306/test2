import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { apiClient } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setUser = useUserStore(s => s.setUser);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post("/auth/login", { email, password });
      setUser(res.data);
      navigate("/dashboard");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Login failed");
    }
  };

  return (
    <Box className="glass-card" component="form" onSubmit={onSubmit} sx={{ maxWidth: 350, mx: "auto" }}>
      <Typography variant="h5" mb={2}>
        Login
      </Typography>
      <TextField
        margin="dense"
        label="Email"
        type="email"
        fullWidth
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        margin="dense"
        label="Password"
        type="password"
        fullWidth
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Log In
      </Button>
    </Box>
  );
};

export default LoginForm;