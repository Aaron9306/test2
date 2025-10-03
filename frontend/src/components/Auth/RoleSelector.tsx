import React from "react";
import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PolicyIcon from "@mui/icons-material/Gavel";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const ROLES = [
  { value: "teacher", label: "Teacher", icon: <SchoolIcon /> },
  { value: "policymaker", label: "Policymaker", icon: <PolicyIcon /> },
  { value: "parent", label: "Parent", icon: <FamilyRestroomIcon /> },
  { value: "healthcare", label: "Healthcare", icon: <LocalHospitalIcon /> }
];

export default function RoleSelector({
  value,
  onChange
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Box sx={{ my: 2 }}>
      <ToggleButtonGroup
        color="primary"
        value={value}
        exclusive
        onChange={(_, v) => v && onChange(v)}
        fullWidth
      >
        {ROLES.map(r => (
          <ToggleButton key={r.value} value={r.value} aria-label={r.label}>
            {r.icon}
            <span style={{ marginLeft: 8 }}>{r.label}</span>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}