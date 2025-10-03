import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { createDevice } from "../../api/deviceApi";

const style = {
  bgcolor: "background.paper",
  p: 4,
  borderRadius: 2,
  mx: "auto",
  my: "20vh",
  width: 350,
  outline: "none"
};

const DeviceOnboardModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
}> = ({ open, onClose, onCreated }) => {
  const [name, setName] = useState("");
  const [secret, setSecret] = useState<string | null>(null);

  const handleCreate = async () => {
    const device = await createDevice(name);
    setSecret(device.deviceSecret);
    if (onCreated) onCreated();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          Onboard Device
        </Typography>
        {!secret ? (
          <>
            <TextField
              label="Device Name"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
              margin="dense"
            />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleCreate} disabled={!name}>
              Create Device
            </Button>
          </>
        ) : (
          <>
            <Typography>
              Device created! Your device secret (save it):
              <pre>{secret}</pre>
            </Typography>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={onClose}>
              Done
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default DeviceOnboardModal;