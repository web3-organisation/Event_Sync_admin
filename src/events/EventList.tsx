import {
  List,
  Datagrid,
  DateField,
  EditButton,
  DeleteButton,
  TopToolbar,
  CreateButton,
  ExportButton,
  SearchInput,
  useRecordContext,
  FunctionField,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import { useThemeMode } from "../lib/ThemeContext";

// ─── Statut dynamique ────────────────────────────────────────────────────────
const EventStatusChip = () => {
  const record = useRecordContext();
  if (!record) return null;

  const now = new Date();
  const start = new Date(record.startDate);
  const end = new Date(record.endDate);

  if (now >= start && now <= end) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            bgcolor: "#22C55E",
            animation: "pulseDot 1.5s ease-in-out infinite",
            "@keyframes pulseDot": {
              "0%, 100%": { opacity: 1, transform: "scale(1)" },
              "50%": { opacity: 0.4, transform: "scale(0.8)" },
            },
          }}
        />
        <Typography
          sx={{
            color: "#22C55E",
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          En cours
        </Typography>
      </Box>
    );
  }

  if (now > end) {
    return (
      <Typography
        sx={{
          color: "#4B5563",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        Terminé
      </Typography>
    );
  }

  return (
    <Typography
      sx={{
        color: "#7C5CFF",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      À venir
    </Typography>
  );
};

// ─── Barre couleur latérale ───────────────────────────────────────────────────
const StatusBar = () => {
  const record = useRecordContext();
  if (!record) return null;

  const now = new Date();
  const start = new Date(record.startDate);
  const end = new Date(record.endDate);

  let color = "#7C5CFF";
  if (now >= start && now <= end) color = "#22C55E";
  else if (now > end) color = "#2C3548";

  return (
    <Box
      sx={{
        width: 4,
        minHeight: 36,
        alignSelf: "stretch",
        borderRadius: "4px",
        bgcolor: color,
        flexShrink: 0,
        transition: "background .25s ease",
      }}
    />
  );
};

// ─── Titre de l'event avec barre ─────────────────────────────────────────────
const EventTitleCell = () => {
  const record = useRecordContext();
  const { mode } = useThemeMode();
  if (!record) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <StatusBar />
      <Box>
        <Typography
          sx={{
            color: mode === "dark" ? "#F8FAFC" : "#0F172A",
            fontWeight: 700,
            fontSize: "0.95rem",
            fontFamily: "'Bricolage Grotesque', sans-serif",
            lineHeight: 1.3,
          }}
        >
          {record.title}
        </Typography>
        {record.location && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              mt: "2px",
            }}
          >
            <PlaceIcon sx={{ fontSize: 11, color: mode === "dark" ? "#4B5563" : "#64748B" }} />
            <Typography sx={{ color: mode === "dark" ? "#4B5563" : "#64748B", fontSize: "0.75rem" }}>
              {record.location}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// ─── Toolbar ─────────────────────────────────────────────────────────────────
const ListActions = () => {
  const { mode } = useThemeMode();
  return (
    <TopToolbar sx={{ alignItems: "center" }}>
      <CreateButton
        label="Nouvel événement"
        sx={{
          background: "linear-gradient(135deg, #6C63FF, #EC4899) !important",
          color: "#fff !important",
          fontWeight: 700,
          fontSize: "0.82rem",
          borderRadius: "10px",
          px: 2.5,
          py: 1,
          border: "none !important",
          boxShadow: mode === "dark" ? "0 4px 16px rgba(108,99,255,0.3)" : "0 4px 16px rgba(108,99,255,0.2)",
          transition: "all .25s ease",
          "&:hover": {
            background: "linear-gradient(135deg, #5A4BFF, #d43d8a) !important",
            boxShadow: mode === "dark" ? "0 6px 24px rgba(108,99,255,0.45) !important" : "0 6px 24px rgba(108,99,255,0.3) !important",
            transform: "translateY(-1px)",
          },
        }}
      />
      <ExportButton sx={{ color: mode === "dark" ? "#4B5563 !important" : "#64748B !important", ml: 1 }} />
    </TopToolbar>
  );
};

const EventFilters = () => {
  const { mode } = useThemeMode();
  return [
    <SearchInput
      key="search"
      source="q"
      alwaysOn
      placeholder="Rechercher un événement…"
      sx={{
        "& .MuiOutlinedInput-root": {
          background: mode === "dark" ? "#0A1120" : "#F8FAFC",
          borderRadius: "10px",
          "& fieldset": { borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0" },
          "&:hover fieldset": { borderColor: "#6C63FF" },
          "&.Mui-focused fieldset": { borderColor: "#6C63FF" },
        },
        "& .MuiInputBase-input::placeholder": { color: mode === "dark" ? "#4B5563" : "#64748B" },
        "& .MuiSvgIcon-root": { color: mode === "dark" ? "#4B5563" : "#64748B" },
      }}
    />,
  ];
};

// ─── Liste principale ─────────────────────────────────────────────────────────
export const EventList = () => {
  const { mode } = useThemeMode();
  return (
    <List
      filters={EventFilters()}
      actions={<ListActions />}
      sort={{ field: "startDate", order: "ASC" }}
      empty={<EmptyEvents />}
      sx={{
        "& .RaList-main": { background: "transparent" },
        "& .RaList-content": {
          background: mode === "dark" ? "#0F172A" : "#FFFFFF",
          border: "1px solid",
          borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: mode === "dark" ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
          mt: 1,
        },
      }}
    >
      <Datagrid
        rowClick="edit"
        bulkActionButtons={false}
        sx={{
          "& .RaDatagrid-headerRow th": {
            background: mode === "dark" ? "#080E1A" : "#F8FAFC",
            color: mode === "dark" ? "#374151" : "#64748B",
            fontWeight: 700,
            fontSize: "0.7rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            borderBottom: "1px solid",
            borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0",
            py: "12px",
            "&:first-of-type": { pl: 3 },
          },
          "& .RaDatagrid-row": {
            cursor: "pointer",
            "&:hover td": { background: mode === "dark" ? "#0A1120" : "#F8FAFC" },
            "&:last-child td": { borderBottom: "none" },
          },
          "& .RaDatagrid-row td": {
            borderBottom: "1px solid",
            borderColor: mode === "dark" ? "#1a2235" : "#F1F5F9",
            py: "14px",
            "&:first-of-type": { pl: 3 },
          },
        }}
      >
        <FunctionField label="Événement" render={() => <EventTitleCell />} />
        <FunctionField label="Statut" render={() => <EventStatusChip />} />
        <DateField
          source="startDate"
          label="Début"
          options={{ day: "2-digit", month: "short", year: "numeric" }}
          locales="fr-FR"
          sx={{ "& span": { color: mode === "dark" ? "#CBD5E1" : "#475569", fontSize: "0.85rem" } }}
        />
        <DateField
          source="endDate"
          label="Fin"
          options={{ day: "2-digit", month: "short", year: "numeric" }}
          locales="fr-FR"
          sx={{ "& span": { color: mode === "dark" ? "#CBD5E1" : "#475569", fontSize: "0.85rem" } }}
        />
        <FunctionField
          label=""
          render={() => (
            <Box sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
              <EditButton
                label=""
                sx={{
                  color: "#7C5CFF",
                  minWidth: 0,
                  p: "6px",
                  borderRadius: "8px",
                  "&:hover": { background: "rgba(124,92,255,0.12)" },
                }}
              />
              <DeleteButton
                label=""
                confirmTitle="Supprimer cet événement ?"
                confirmContent="Cette action est irréversible. Toutes les sessions et salles associées seront supprimées."
                sx={{
                  color: "#EF4444",
                  minWidth: 0,
                  p: "6px",
                  borderRadius: "8px",
                  "&:hover": { background: "rgba(239,68,68,0.1)" },
                }}
              />
            </Box>
          )}
        />
      </Datagrid>
    </List>
  );
};

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyEvents = () => {
  const { mode } = useThemeMode();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 10,
        gap: 2,
        background: mode === "dark" ? "#0F172A" : "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid",
        borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0",
        mt: 1,
      }}
    >
      <CalendarMonthIcon sx={{ fontSize: 52, color: mode === "dark" ? "#1E293B" : "#CBD5E1" }} />
      <Typography
        sx={{
          color: mode === "dark" ? "#4B5563" : "#64748B",
          fontSize: "1rem",
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontWeight: 700,
        }}
      >
        Aucun événement pour le moment
      </Typography>
      <Typography sx={{ color: mode === "dark" ? "#374151" : "#94A3B8", fontSize: "0.85rem" }}>
        Créez votre premier événement pour commencer
      </Typography>
      <CreateButton
        label="Créer un événement"
        sx={{
          mt: 1,
          background: "linear-gradient(135deg, #6C63FF, #EC4899) !important",
          color: "#fff !important",
          fontWeight: 700,
          borderRadius: "10px",
          px: 3,
          py: 1,
          border: "none !important",
          "&:hover": {
            background: "linear-gradient(135deg, #5A4BFF, #d43d8a) !important",
          },
        }}
      />
    </Box>
  );
};
