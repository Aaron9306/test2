import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores";
import { apiClient } from "../../utils/api";

const Header: React.FC = () => {
  const user = useUserStore(s => s.user);
  const setUser = useUserStore(s => s.setUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await apiClient.post("/auth/logout");
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <AppBar position="static" sx={{ mb: 2, background: "rgba(28,30,40,0.9)", backdropFilter: "blur(6px)" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Air Quality Dashboard
        </Typography>
        {user ? (
          <>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {user.email} ({user.role})
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/auth/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/auth/signup")}>
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;