import {
  List,
  Datagrid,
  FunctionField,
  DeleteButton,
  EditButton,
  TopToolbar,
  CreateButton,
  SearchInput,
  ExportButton,
  useRecordContext,
} from "react-admin";
import { Box, Chip, Typography } from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LayersIcon from "@mui/icons-material/Layers";
import { useThemeMode } from "../lib/ThemeContext";

// ─── Icône salle ──────────────────────────────────────────────────────────────
const RoomCell = () => {
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
          background: "linear-gradient(135deg, rgba(108,99,255,0.2), rgba(236,72,153,0.1))",
          border: "1px solid rgba(108,99,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <MeetingRoomIcon sx={{ fontSize: 17, color: mode === "dark" ? "#A78BFA" : "#6C63FF" }} />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: 700, color: mode === "dark" ? "#F1F5F9" : "#0F172A", fontSize: "0.9rem" }}>
          {record.name}
        </Typography>
        <Typography sx={{ color: mode === "dark" ? "#4B5563" : "#64748B", fontSize: "0.72rem" }}>
          #{(record.id as string).slice(-6)}
        </Typography>
      </Box>
    </Box>
  );
};

// ─── Badge sessions ───────────────────────────────────────────────────────────
const SessionCountBadge = () => {
  const record = useRecordContext();
  if (!record) return null;
  const count = (record._count as { sessions: number })?.sessions ?? 0;
  return (
    <Chip
      icon={<LayersIcon sx={{ fontSize: "13px !important" }} />}
      label={`${count} session${count !== 1 ? "s" : ""}`}
      size="small"
      sx={{
        background: count > 0 ? "rgba(34,197,94,0.1)" : "rgba(71,85,105,0.15)",
        color: count > 0 ? "#22C55E" : "#475569",
        border: `1px solid ${count > 0 ? "rgba(34,197,94,0.2)" : "rgba(71,85,105,0.2)"}`,
        fontWeight: 600,
        fontSize: "0.72rem",
        height: 24,
        "& .MuiChip-icon": { color: "inherit" },
      }}
    />
  );
};

// ─── Toolbar ─────────────────────────────────────────────────────────────────
const RoomActions = () => {
  const { mode } = useThemeMode();
  return (
    <TopToolbar sx={{ alignItems: "center", gap: 1 }}>
      <ExportButton sx={{ color: mode === "dark" ? "#475569 !important" : "#64748B !important" }} />
      <CreateButton
        label="Nouvelle salle"
        sx={{
          background: "linear-gradient(135deg, #6C63FF, #EC4899) !important",
          color: "#fff !important",
          fontWeight: 700,
          fontSize: "0.82rem",
          borderRadius: "10px",
          px: 2.5,
          py: 1,
          border: "none !important",
          boxShadow: mode === "dark" ? "0 4px 14px rgba(108,99,255,0.3)" : "0 4px 14px rgba(108,99,255,0.2)",
          "&:hover": {
            background: "linear-gradient(135deg, #5A4BFF, #d43d8a) !important",
            boxShadow: mode === "dark" ? "0 6px 20px rgba(108,99,255,0.45) !important" : "0 6px 20px rgba(108,99,255,0.3) !important",
            transform: "translateY(-1px)",
          },
        }}
      />
    </TopToolbar>
  );
};

const RoomFilters = () => {
  const { mode } = useThemeMode();
  return [
    <SearchInput
      key="q"
      source="q"
      alwaysOn
      placeholder="Rechercher une salle…"
      sx={{
        "& .MuiOutlinedInput-root": {
          background: mode === "dark" ? "#0A1120" : "#F8FAFC",
          borderRadius: "10px",
          "& fieldset": { borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0" },
          "&:hover fieldset": { borderColor: "#6C63FF" },
          "&.Mui-focused fieldset": { borderColor: "#6C63FF" },
        },
        "& .MuiInputBase-input": { color: mode === "dark" ? "#E2E8F0" : "#0F172A" },
        "& .MuiInputBase-input::placeholder": { color: mode === "dark" ? "#4B5563" : "#64748B" },
        "& .MuiSvgIcon-root": { color: mode === "dark" ? "#4B5563" : "#64748B" },
      }}
    />,
  ];
};

// ─── RoomList ─────────────────────────────────────────────────────────────────
export function RoomList() {
  const { mode } = useThemeMode();
  return (
    <List
      filters={RoomFilters()}
      actions={<RoomActions />}
      sort={{ field: "name", order: "ASC" }}
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
            transition: "background 0.15s ease",
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
        <FunctionField label="Salle" render={() => <RoomCell />} />
        <FunctionField label="Sessions" render={() => <SessionCountBadge />} />
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
                confirmTitle="Supprimer cette salle ?"
                confirmContent="Impossible de supprimer une salle contenant des sessions."
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
