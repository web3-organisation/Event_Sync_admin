import {
  List,
  Datagrid,
  TextField,
  FunctionField,
  DeleteButton,
  EditButton,
  TopToolbar,
  CreateButton,
  FilterButton,
  useGetList,
  SelectInput,
} from "react-admin";
import { Box, Chip, Typography } from "@mui/material";

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
      sx={{ minWidth: 240, mb: 0 }}
    />
  );
}

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
      sx={{ minWidth: 200, mb: 0 }}
    />
  );
}

// ─── Toolbar ─────────────────────────────────────────────────────────────────
function SessionActions() {
  return (
    <TopToolbar>
      <FilterButton />
      <CreateButton label="Nouvelle session" />
    </TopToolbar>
  );
}

// ─── Badge statut ─────────────────────────────────────────────────────────────
function StatusBadge({ record }: { record: Record<string, unknown> }) {
  const now = new Date();
  const start = new Date(record.startTime as string);
  const end = new Date(record.endTime as string);

  if (now >= start && now <= end) {
    return (
      <Chip
        label="En direct"
        size="small"
        sx={{
          background: "linear-gradient(135deg, #EF4444, #F97316)",
          color: "#fff",
          fontWeight: 700,
          fontSize: "0.7rem",
          height: 22,
          animation: "pulse 2s infinite",
          "@keyframes pulse": {
            "0%, 100%": { opacity: 1 },
            "50%": { opacity: 0.7 },
          },
        }}
      />
    );
  }
  if (now > end) {
    return (
      <Chip
        label="Terminée"
        size="small"
        sx={{
          background: "rgba(148,163,184,0.15)",
          color: "#94A3B8",
          fontWeight: 600,
          fontSize: "0.7rem",
          height: 22,
        }}
      />
    );
  }
  return (
    <Chip
      label="À venir"
      size="small"
      sx={{
        background: "rgba(108,99,255,0.12)",
        color: "#6C63FF",
        fontWeight: 600,
        fontSize: "0.7rem",
        height: 22,
      }}
    />
  );
}

// ─── Colonne heure ────────────────────────────────────────────────────────────
function TimeRange({ record }: { record: Record<string, unknown> }) {
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
    <Box>
      <Typography
        variant="body2"
        sx={{ fontWeight: 600, color: "#0F172A", fontSize: "0.82rem" }}
      >
        {fmt(record.startTime as string)} → {fmt(record.endTime as string)}
      </Typography>
      <Typography variant="caption" sx={{ color: "#94A3B8" }}>
        {day}
      </Typography>
    </Box>
  );
}

// ─── SessionList ──────────────────────────────────────────────────────────────
export function SessionList() {
  const filters = [
    <EventFilter key="event" source="eventId" alwaysOn />,
    <RoomFilter key="room" source="roomId" alwaysOn />,
  ];

  return (
    <List
      filters={filters}
      actions={<SessionActions />}
      sort={{ field: "startTime", order: "ASC" }}
      sx={{ "& .RaList-main": { boxShadow: "none" } }}
    >
      <Datagrid
        bulkActionButtons={false}
        sx={{
          "& .RaDatagrid-headerCell": {
            background: "#F8F9FF",
            color: "#475569",
            fontWeight: 700,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            borderBottom: "2px solid #DDE0EF",
          },
          "& .RaDatagrid-row:hover td": { background: "#F8F9FF" },
          "& .RaDatagrid-row td": {
            borderBottom: "1px solid #EEF1F7",
            padding: "12px 16px",
          },
        }}
      >
        <TextField source="title" label="Titre" />

        <FunctionField
          label="Horaire"
          render={(record) => (
            <TimeRange record={record as Record<string, unknown>} />
          )}
        />

        <TextField source="room" label="Salle" />

        <FunctionField
          label="Statut"
          render={(record) => (
            <StatusBadge record={record as Record<string, unknown>} />
          )}
        />

        <FunctionField
          label="Intervenants"
          render={(record) =>
            Array.isArray(record.speakers) && record.speakers.length ? (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {(record.speakers as string[]).map((name, i) => (
                  <Chip
                    key={i}
                    label={name}
                    size="small"
                    sx={{
                      background: "rgba(108,99,255,0.08)",
                      color: "#6C63FF",
                      fontWeight: 500,
                      fontSize: "0.7rem",
                      height: 20,
                    }}
                  />
                ))}
              </Box>
            ) : (
              <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                —
              </Typography>
            )
          }
        />

        <EditButton label="" />
        <DeleteButton label="" mutationMode="pessimistic" />
      </Datagrid>
    </List>
  );
}
