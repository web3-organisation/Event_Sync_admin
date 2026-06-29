import type { ReactNode } from "react";
import {
  Layout as RALayout,
  CheckForApplicationUpdate,
  AppBar,
  TitlePortal,
  UserMenu,
  Logout,
  MenuItemLink,
  Menu,
} from "react-admin";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "./lib/ThemeContext";

// ─── Sidebar Logo ─────────────────────────────────────────────────────────────
const SidebarLogo = () => {
  const { mode } = useThemeMode();
  return (
    <Box
      sx={{
        px: 2.5,
        py: 2.5,
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        borderBottom: "1px solid",
        borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0",
        mb: 1,
      }}
    >
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: "10px",
          background: "linear-gradient(135deg, #6C63FF, #EC4899)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow:
            mode === "dark"
              ? "0 4px 12px rgba(108,99,255,0.35)"
              : "0 4px 12px rgba(108,99,255,0.25)",
        }}
      >
        <DashboardIcon sx={{ fontSize: 18, color: "#fff" }} />
      </Box>
      <Box>
        <Typography
          sx={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: "0.95rem",
            color: mode === "dark" ? "#F1F5F9" : "#0F172A",
            lineHeight: 1.1,
          }}
        >
          EventSync
        </Typography>
        <Typography
          sx={{
            fontSize: "0.68rem",
            color: mode === "dark" ? "#4B5563" : "#64748B",
            letterSpacing: "0.06em",
          }}
        >
          Administration
        </Typography>
      </Box>
    </Box>
  );
};

// ─── Custom Menu ──────────────────────────────────────────────────────────────
const CustomMenu = () => {
  const { mode } = useThemeMode();
  return (
    <Box sx={{ pt: 0.5 }}>
      <SidebarLogo />
      <Menu>
        <MenuItemLink
          to="/events"
          primaryText="Événements"
          leftIcon={<EventIcon sx={{ fontSize: 20 }} />}
        />
        <MenuItemLink
          to="/sessions"
          primaryText="Sessions"
          leftIcon={<CalendarMonthIcon sx={{ fontSize: 20 }} />}
        />
        <MenuItemLink
          to="/speakers"
          primaryText="Intervenants"
          leftIcon={<PeopleIcon sx={{ fontSize: 20 }} />}
        />
        <MenuItemLink
          to="/rooms"
          primaryText="Salles"
          leftIcon={<MeetingRoomIcon sx={{ fontSize: 20 }} />}
        />
        <Divider
          sx={{
            my: 1,
            mx: 2,
            borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0",
          }}
        />
      </Menu>
    </Box>
  );
};

// ─── Theme Toggle Button ──────────────────────────────────────────────────────
const ThemeToggle = () => {
  const { mode, toggle } = useThemeMode();
  return (
    <IconButton
      onClick={toggle}
      color="inherit"
      sx={{
        ml: 1,
        color: mode === "dark" ? "#E2E8F0" : "#475569",
        "&:hover": {
          backgroundColor:
            mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
        },
      }}
    >
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

// ─── Custom AppBar ────────────────────────────────────────────────────────────
const CustomAppBar = () => {
  const { mode } = useThemeMode();
  return (
    <AppBar
      toolbar={
        <>
          <ThemeToggle />
          <UserMenu>
            <Logout />
          </UserMenu>
        </>
      }
      sx={{
        "& .MuiToolbar-root": {
          background: mode === "dark" ? "#080E1A" : "#FFFFFF",
          borderBottom: "1px solid",
          borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0",
          minHeight: "56px !important",
        },
      }}
    >
      <TitlePortal />
    </AppBar>
  );
};

// ─── Layout ───────────────────────────────────────────────────────────────────
export const Layout = ({ children }: { children: ReactNode }) => {
  const { mode } = useThemeMode();
  return (
    <RALayout
      appBar={CustomAppBar}
      menu={CustomMenu}
      sx={{
        "& .RaLayout-content": {
          background: mode === "dark" ? "#080E1A" : "#F1F5F9",
          minHeight: "100vh",
          padding: "24px 32px",
        },
        "& .RaSidebar-root": {
          background: mode === "dark" ? "#080E1A" : "#FFFFFF",
          borderRight: "1px solid",
          borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0",
        },
        "& .RaSidebar-fixed": {
          background: mode === "dark" ? "#080E1A" : "#FFFFFF",
        },
      }}
    >
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  );
};
