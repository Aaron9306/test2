import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#0ea5ff" },
    secondary: { main: "#7c3aed" },
    background: { default: "#0f172a", paper: "rgba(30,41,59,0.7)" }
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "rgba(30,41,59,0.7)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 2px 8px rgba(14,165,255,0.12), 0 0 0 1px #7c3aed40"
        }
      }
    }
  }
});
export default theme;