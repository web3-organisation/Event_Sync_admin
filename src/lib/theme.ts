import { createTheme } from "@mui/material/styles";
import { defaultTheme } from "react-admin";

// ─── Tokens communs ────────────────────────────────────────────────────────────
const common = {
  typography: {
    fontFamily: "'Inter', 'Bricolage Grotesque', sans-serif",
    h1: { fontFamily: "'Bricolage Grotesque', sans-serif" },
    h2: { fontFamily: "'Bricolage Grotesque', sans-serif" },
    h3: { fontFamily: "'Bricolage Grotesque', sans-serif" },
    h4: { fontFamily: "'Bricolage Grotesque', sans-serif" },
    h5: { fontFamily: "'Bricolage Grotesque', sans-serif" },
    h6: { fontFamily: "'Bricolage Grotesque', sans-serif" },
  },
  shape: { borderRadius: 12 },
};

// ─── Thème DARK ────────────────────────────────────────────────────────────────
export const darkTheme = createTheme({
  ...defaultTheme,
  ...common,
  palette: {
    mode: "dark",
    primary: { main: "#6C63FF" },
    secondary: { main: "#EC4899" },
    background: { default: "#080E1A", paper: "#0F172A" },
    text: { primary: "#E2E8F0", secondary: "#64748B" },
    error: { main: "#EF4444" },
    success: { main: "#22C55E" },
    divider: "#1E293B",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#0F172A",
          border: "1px solid #1E293B",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "0.84rem",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #6C63FF, #EC4899)",
          boxShadow: "0 4px 14px rgba(108,99,255,0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #5A4BFF, #d43d8a)",
            boxShadow: "0 6px 20px rgba(108,99,255,0.5)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          backgroundColor: "#0A1120",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6C63FF",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6C63FF",
            borderWidth: "1.5px",
          },
        },
        notchedOutline: { borderColor: "#1E293B" },
        input: { color: "#E2E8F0" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: "#64748B", "&.Mui-focused": { color: "#6C63FF" } },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#080E1A",
          color: "#475569",
          fontWeight: 700,
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          borderBottom: "1px solid #1E293B",
        },
        body: { color: "#CBD5E1", borderBottom: "1px solid #1a2235" },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover td": { backgroundColor: "#0F172A" },
          "&:last-child td": { borderBottom: "none" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: "6px", fontWeight: 600, fontSize: "0.72rem" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#0F172A",
          border: "1px solid #1E293B",
          borderRadius: "18px",
          backgroundImage: "none",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "rgba(108,99,255,0.08)" },
          "&.Mui-selected": { backgroundColor: "rgba(108,99,255,0.15)" },
        },
      },
    },
    MuiSelect: { styleOverrides: { icon: { color: "#64748B" } } },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          margin: "2px 8px",
          "&.RaMenuItemLink-active": {
            background:
              "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(236,72,153,0.08))",
            color: "#A78BFA",
            "& .MuiListItemIcon-root": { color: "#A78BFA" },
          },
          "&:hover": { background: "rgba(108,99,255,0.08)" },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: { backgroundColor: "#0A1120", borderBottom: "1px solid #1E293B" },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: "#080E1A", borderRight: "1px solid #1E293B" },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: { "&.Mui-checked": { color: "#6C63FF" } },
        track: { backgroundColor: "#1E293B" },
      },
    },
  },
});

// ─── Thème LIGHT ───────────────────────────────────────────────────────────────
export const lightTheme = createTheme({
  ...defaultTheme,
  ...common,
  palette: {
    mode: "light",
    primary: { main: "#6C63FF" },
    secondary: { main: "#EC4899" },
    background: { default: "#F1F5F9", paper: "#FFFFFF" },
    text: { primary: "#0F172A", secondary: "#475569" },
    error: { main: "#EF4444" },
    success: { main: "#16A34A" },
    divider: "#E2E8F0",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "0.84rem",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #6C63FF, #EC4899)",
          boxShadow: "0 4px 14px rgba(108,99,255,0.25)",
          color: "#fff",
          "&:hover": {
            background: "linear-gradient(135deg, #5A4BFF, #d43d8a)",
            boxShadow: "0 6px 20px rgba(108,99,255,0.4)",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          backgroundColor: "#F8FAFC",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6C63FF",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#6C63FF",
            borderWidth: "1.5px",
          },
        },
        notchedOutline: { borderColor: "#E2E8F0" },
        input: { color: "#0F172A" },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: "#64748B", "&.Mui-focused": { color: "#6C63FF" } },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#F8FAFC",
          color: "#64748B",
          fontWeight: 700,
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          borderBottom: "1px solid #E2E8F0",
        },
        body: { color: "#334155", borderBottom: "1px solid #F1F5F9" },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover td": { backgroundColor: "#F8FAFC" },
          "&:last-child td": { borderBottom: "none" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: "6px", fontWeight: 600, fontSize: "0.72rem" },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "18px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "rgba(108,99,255,0.06)" },
          "&.Mui-selected": { backgroundColor: "rgba(108,99,255,0.1)" },
        },
      },
    },
    MuiSelect: { styleOverrides: { icon: { color: "#94A3B8" } } },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          margin: "2px 8px",
          "&.RaMenuItemLink-active": {
            background:
              "linear-gradient(135deg, rgba(108,99,255,0.12), rgba(236,72,153,0.06))",
            color: "#6C63FF",
            "& .MuiListItemIcon-root": { color: "#6C63FF" },
          },
          "&:hover": { background: "rgba(108,99,255,0.06)" },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: { backgroundColor: "#FFFFFF", borderBottom: "1px solid #E2E8F0" },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: { backgroundColor: "#FFFFFF", borderRight: "1px solid #E2E8F0" },
      },
    },
  },
});
