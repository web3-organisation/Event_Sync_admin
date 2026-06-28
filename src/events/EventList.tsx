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
  if (!record) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <StatusBar />
      <Box>
        <Typography
          sx={{
            color: "#F8FAFC",
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
            <PlaceIcon sx={{ fontSize: 11, color: "#4B5563" }} />
            <Typography sx={{ color: "#4B5563", fontSize: "0.75rem" }}>
              {record.location}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

// ─── Toolbar ─────────────────────────────────────────────────────────────────
const ListActions = () => (
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
        boxShadow: "0 4px 16px rgba(108,99,255,0.3)",
        transition: "all .25s ease",
        "&:hover": {
          background: "linear-gradient(135deg, #5A4BFF, #d43d8a) !important",
          boxShadow: "0 6px 24px rgba(108,99,255,0.45) !important",
          transform: "translateY(-1px)",
        },
      }}
    />
    <ExportButton sx={{ color: "#4B5563 !important", ml: 1 }} />
  </TopToolbar>
);

const eventFilters = [
  <SearchInput
    key="search"
    source="q"
    alwaysOn
    placeholder="Rechercher un événement…"
    sx={{
      "& .MuiOutlinedInput-root": {
        background: "#0d1117",
        color: "#e0e0f0",
        borderRadius: "10px",
        "& fieldset": { borderColor: "#1E293B" },
        "&:hover fieldset": { borderColor: "#6C63FF" },
        "&.Mui-focused fieldset": { borderColor: "#6C63FF" },
      },
      "& .MuiInputBase-input::placeholder": { color: "#4B5563" },
      "& .MuiSvgIcon-root": { color: "#4B5563" },
    }}
  />,
];

// ─── Liste principale ─────────────────────────────────────────────────────────
export const EventList = () => (
  <List
    filters={eventFilters}
    actions={<ListActions />}
    sort={{ field: "startDate", order: "ASC" }}
    empty={<EmptyEvents />}
    sx={{
      "& .RaList-main": { background: "transparent" },
      "& .RaList-content": {
        background: "#111827",
        border: "1px solid #1E293B",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "none",
        mt: 1,
      },
    }}
  >
    <Datagrid
      rowClick="edit"
      bulkActionButtons={false}
      sx={{
        "& .RaDatagrid-headerRow th": {
          background: "#0d1117",
          color: "#374151",
          fontWeight: 700,
          fontSize: "0.7rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          borderBottom: "1px solid #1E293B",
          py: "12px",
          "&:first-of-type": { pl: 3 },
        },
        "& .RaDatagrid-row": {
          cursor: "pointer",
          "&:hover td": { background: "#0f172a" },
          "&:last-child td": { borderBottom: "none" },
        },
        "& .RaDatagrid-row td": {
          borderBottom: "1px solid #1a2235",
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
        sx={{ "& span": { color: "#CBD5E1", fontSize: "0.85rem" } }}
      />
      <DateField
        source="endDate"
        label="Fin"
        options={{ day: "2-digit", month: "short", year: "numeric" }}
        locales="fr-FR"
        sx={{ "& span": { color: "#CBD5E1", fontSize: "0.85rem" } }}
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

// ─── Empty state ──────────────────────────────────────────────────────────────
const EmptyEvents = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 10,
      gap: 2,
      background: "#111827",
      borderRadius: "16px",
      border: "1px solid #1E293B",
      mt: 1,
    }}
  >
    <CalendarMonthIcon sx={{ fontSize: 52, color: "#1E293B" }} />
    <Typography
      sx={{
        color: "#4B5563",
        fontSize: "1rem",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 700,
      }}
    >
      Aucun événement pour le moment
    </Typography>
    <Typography sx={{ color: "#374151", fontSize: "0.85rem" }}>
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
