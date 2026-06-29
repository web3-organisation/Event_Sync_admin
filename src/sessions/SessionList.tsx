import {
  List,
  Datagrid,
  FunctionField,
  DeleteButton,
  EditButton,
  TopToolbar,
  CreateButton,
  FilterButton,
  ExportButton,
  useGetList,
  SelectInput,
  useRecordContext,
} from "react-admin";
import { Box, Chip, Typography, Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useThemeMode } from "../lib/ThemeContext";

// ─── Filtre Événement ─────────────────────────────────────────────────────────
function EventFilter(_: { source?: string; alwaysOn?: boolean }) {
  const { data: events = [], isLoading } = useGetList("events", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "startDate", order: "ASC" },
  });
  if (isLoading) return null;
  return (
    <SelectInput
      source="eventId"
      label="Événement"
      choices={events.map((e) => ({ id: e.id, name: e.title }))}
      emptyText="Tous les événements"
      emptyValue=""
      sx={{ minWidth: 220, mb: 0 }}
    />
  );
}

// ─── Filtre Salle ─────────────────────────────────────────────────────────────
function RoomFilter(_: { source?: string; alwaysOn?: boolean }) {
  const { data: rooms = [], isLoading } = useGetList("rooms", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "name", order: "ASC" },
  });
  if (isLoading) return null;
  return (
    <SelectInput
      source="roomId"
      label="Salle"
      choices={rooms.map((r) => ({ id: r.id, name: r.name }))}
      emptyText="Toutes les salles"
      emptyValue=""
      sx={{ minWidth: 180, mb: 0 }}
    />
  );
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────
function SessionActions() {
  const { mode } = useThemeMode();
  return (
    <TopToolbar sx={{ alignItems: "center", gap: 1 }}>
      <FilterButton />
      <ExportButton
        sx={{
          color: mode === "dark" ? "#475569 !important" : "#64748B !important",
        }}
      />
      <CreateButton
        label="Nouvelle session"
        sx={{
          background: "linear-gradient(135deg, #6C63FF, #EC4899) !important",
          color: "#fff !important",
          fontWeight: 700,
          fontSize: "0.82rem",
          borderRadius: "10px",
          px: 2.5,
          py: 1,
          border: "none !important",
          boxShadow:
            mode === "dark"
              ? "0 4px 14px rgba(108,99,255,0.3)"
              : "0 4px 14px rgba(108,99,255,0.2)",
          "&:hover": {
            background: "linear-gradient(135deg, #5A4BFF, #d43d8a) !important",
            boxShadow:
              mode === "dark"
                ? "0 6px 20px rgba(108,99,255,0.45) !important"
                : "0 6px 20px rgba(108,99,255,0.3) !important",
            transform: "translateY(-1px)",
          },
        }}
      />
    </TopToolbar>
  );
}

// ─── Titre session ────────────────────────────────────────────────────────────
const SessionTitleCell = () => {
  const record = useRecordContext();
  const { mode } = useThemeMode();
  if (!record) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: "10px",
          background:
            "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(236,72,153,0.1))",
          border: "1px solid rgba(108,99,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <CalendarMonthIcon
          sx={{ fontSize: 16, color: mode === "dark" ? "#A78BFA" : "#6C63FF" }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 700,
            color: mode === "dark" ? "#F1F5F9" : "#0F172A",
            fontSize: "0.88rem",
            lineHeight: 1.3,
          }}
        >
          {record.title as string}
        </Typography>
        {record.room && (
          <Typography
            sx={{
              color: mode === "dark" ? "#475569" : "#64748B",
              fontSize: "0.72rem",
            }}
          >
            {record.room as string}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

// ─── Horaire ─────────────────────────────────────────────────────────────────
const TimeRangeCell = () => {
  const record = useRecordContext();
  const { mode } = useThemeMode();
  if (!record?.startTime) return null;
  const fmt = (iso: string) =>
    new Date(iso).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  const day = new Date(record.startTime as string).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
  });
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <AccessTimeIcon sx={{ fontSize: 14, color: "#6C63FF", flexShrink: 0 }} />
      <Box>
        <Typography
          sx={{
            fontWeight: 600,
            color: mode === "dark" ? "#E2E8F0" : "#0F172A",
            fontSize: "0.83rem",
          }}
        >
          {fmt(record.startTime as string)} → {fmt(record.endTime as string)}
        </Typography>
        <Typography
          sx={{
            color: mode === "dark" ? "#475569" : "#64748B",
            fontSize: "0.72rem",
          }}
        >
          {day}
        </Typography>
      </Box>
    </Box>
  );
};

// ─── Statut ───────────────────────────────────────────────────────────────────
const StatusBadge = () => {
  const record = useRecordContext();
  const { mode } = useThemeMode();
  if (!record) return null;
  const now = new Date();
  const start = new Date(record.startTime as string);
  const end = new Date(record.endTime as string);

  if (now >= start && now <= end)
    return (
      <Chip
        label="EN DIRECT"
        size="small"
        sx={{
          background: "linear-gradient(135deg, #EF4444, #F97316)",
          color: "#fff",
          fontWeight: 800,
          fontSize: "0.67rem",
          letterSpacing: "0.06em",
          height: 22,
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.7 },
          },
        }}
      />
    );
  if (now > end)
    return (
      <Chip
        label="Terminée"
        size="small"
        sx={{
          background:
            mode === "dark" ? "rgba(71,85,105,0.15)" : "rgba(71,85,105,0.1)",
          color: mode === "dark" ? "#475569" : "#64748B",
          fontWeight: 600,
          fontSize: "0.72rem",
          height: 22,
          border:
            mode === "dark"
              ? "1px solid rgba(71,85,105,0.2)"
              : "1px solid rgba(71,85,105,0.1)",
        }}
      />
    );
  return (
    <Chip
      label="À venir"
      size="small"
      sx={{
        background: "rgba(108,99,255,0.12)",
        color: mode === "dark" ? "#A78BFA" : "#6C63FF",
        fontWeight: 600,
        fontSize: "0.72rem",
        height: 22,
        border: "1px solid rgba(108,99,255,0.2)",
      }}
    />
  );
};

// ─── Intervenants ─────────────────────────────────────────────────────────────
const SpeakersCell = () => {
  const record = useRecordContext();
  const { mode } = useThemeMode();
  if (!record) return null;
  const speakers = record.speakers as string[];
  if (!Array.isArray(speakers) || !speakers.length)
    return (
      <Typography
        sx={{
          color: mode === "dark" ? "#374151" : "#94A3B8",
          fontSize: "0.78rem",
        }}
      >
        —
      </Typography>
    );
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {speakers.map((name, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Avatar
            sx={{
              width: 20,
              height: 20,
              fontSize: "0.6rem",
              background: "linear-gradient(135deg, #6C63FF, #EC4899)",
            }}
          >
            {name[0]?.toUpperCase()}
          </Avatar>
          <Typography
            sx={{
              color: mode === "dark" ? "#94A3B8" : "#64748B",
              fontSize: "0.78rem",
              fontWeight: 500,
            }}
          >
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

const sessionFilters = [
  <EventFilter key="event" source="eventId" alwaysOn />,
  <RoomFilter key="room" source="roomId" alwaysOn />,
];

// ─── SessionList ──────────────────────────────────────────────────────────────
export function SessionList() {
  const { mode } = useThemeMode();
  return (
    <List
      filters={sessionFilters}
      actions={<SessionActions />}
      sort={{ field: "startTime", order: "ASC" }}
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
            "&:hover td": {
              background: mode === "dark" ? "#0A1120" : "#F8FAFC",
            },
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
        <FunctionField label="Session" render={() => <SessionTitleCell />} />
        <FunctionField label="Horaire" render={() => <TimeRangeCell />} />
        <FunctionField label="Statut" render={() => <StatusBadge />} />
        <FunctionField label="Intervenants" render={() => <SpeakersCell />} />
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
                mutationMode="pessimistic"
                confirmTitle="Supprimer cette session ?"
                confirmContent="Cette action supprimera aussi toutes les questions associées."
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
}
