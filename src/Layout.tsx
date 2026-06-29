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
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "./lib/ThemeContext";

const SidebarLogo = () => {
  const { mode } = useThemeMode();
  return (
    <Box
      sx={{
        px: 1.5,
        py: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0",
        mb: 1,
        overflow: "hidden",
        minWidth: 0,
      }}
    >
      <Box
        component="img"
        src="/logo.png"
        alt="EventSync Logo"
        sx={{
          width: 200, // large pour que le logo visible soit grand
          height: "auto",
          objectFit: "contain",
          maxWidth: "100%",
          my: -5, // compense l'espace transparent en haut/bas du PNG
          mx: -2, // compense l'espace transparent gauche/droite
        }}
      />
      <Typography
        sx={{
          fontSize: "0.65rem",
          color: mode === "dark" ? "#4B5563" : "#64748B",
          letterSpacing: "0.06em",
          mt: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        Administration
      </Typography>
    </Box>
  );
};
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
      toolbar={<ThemeToggle />}
      userMenu={
        <UserMenu>
          <Logout />
        </UserMenu>
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
