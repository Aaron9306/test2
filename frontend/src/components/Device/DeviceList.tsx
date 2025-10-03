import React, { useState, useEffect } from "react";
import { Paper, Typography, IconButton, List, ListItem, ListItemText, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getDevices, Device } from "../../api/deviceApi";
import DeviceOnboardModal from "./DeviceOnboardModal";

const DeviceList: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getDevices().then(setDevices);
  }, [modalOpen]);

  return (
    <Paper className="glass-card">
      <Typography variant="h6" sx={{ display: "flex", alignItems: "center" }}>
        Your Devices
        <IconButton sx={{ ml: "auto" }} onClick={() => setModalOpen(true)}>
          <AddIcon />
        </IconButton>
      </Typography>
      <List>
        {devices.length === 0 && <ListItem><ListItemText primary="No devices yet." /></ListItem>}
        {devices.map(dev => (
          <ListItem key={dev.id}>
            <ListItemText
              primary={dev.name}
              secondary={dev.lastSeenAt ? `Last seen: ${new Date(dev.lastSeenAt).toLocaleString()}` : ""}
            />
          </ListItem>
        ))}
      </List>
      <DeviceOnboardModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={() => setModalOpen(false)} />
    </Paper>
  );
};

export default DeviceList;