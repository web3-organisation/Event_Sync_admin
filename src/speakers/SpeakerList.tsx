import {
  List,
  Datagrid,
  EditButton,
  DeleteButton,
  SearchInput,
  TopToolbar,
  CreateButton,
  FunctionField,
} from "react-admin";
import { Avatar, Box, Typography } from "@mui/material";
import { useThemeMode } from "../lib/ThemeContext";

// ─── Toolbar ──────────────────────────────────────────────────────────────────
function SpeakerActions() {
  const { mode } = useThemeMode();
  return (
    <TopToolbar>
      <CreateButton
        label="Nouvel intervenant"
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

// ─── Filters ──────────────────────────────────────────────────────────────────
const SpeakerFilters = () => {
  const { mode } = useThemeMode();
  return [
    <SearchInput
      source="q"
      alwaysOn
      key="search"
      placeholder="Rechercher…"
      sx={{
        "& .MuiOutlinedInput-root": {
          background: mode === "dark" ? "#0A1120" : "#F8FAFC",
          borderRadius: "10px",
          "& fieldset": {
            borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0",
          },
          "&:hover fieldset": { borderColor: "#6C63FF" },
          "&.Mui-focused fieldset": { borderColor: "#6C63FF" },
        },
        "& .MuiInputBase-input": {
          color: mode === "dark" ? "#E2E8F0" : "#0F172A",
        },
        "& .MuiInputBase-input::placeholder": {
          color: mode === "dark" ? "#4B5563" : "#64748B",
        },
        "& .MuiSvgIcon-root": {
          color: mode === "dark" ? "#4B5563" : "#64748B",
        },
      }}
    />,
  ];
};

// ─── SpeakerList ──────────────────────────────────────────────────────────────
export const SpeakerList = () => {
  const { mode } = useThemeMode();
  return (
    <List
      filters={SpeakerFilters()}
      actions={<SpeakerActions />}
      perPage={10}
      sort={{ field: "createdAt", order: "DESC" }}
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
        {/* Avatar + Nom */}
        <FunctionField
          label="Intervenant"
          render={(record: Record<string, unknown>) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Avatar
                src={record.photoUrl as string}
                alt={record.fullName as string}
                sx={{
                  width: 38,
                  height: 38,
                  background: "linear-gradient(135deg, #6C63FF, #EC4899)",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                }}
              >
                {(record.fullName as string)?.[0]?.toUpperCase()}
              </Avatar>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  color: mode === "dark" ? "#F1F5F9" : "#0F172A",
                }}
              >
                {record.fullName as string}
              </Typography>
            </Box>
          )}
        />

        {/* Bio (tronquée) */}
        <FunctionField
          label="Bio"
          render={(record: Record<string, unknown>) =>
            record.bio ? (
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  color: mode === "dark" ? "#94A3B8" : "#475569",
                  maxWidth: 340,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {record.bio as string}
              </Typography>
            ) : (
              <Typography
                variant="caption"
                sx={{ color: mode === "dark" ? "#4B5563" : "#94A3B8" }}
              >
                —
              </Typography>
            )
          }
        />

        {/* Liens — affiche l'URL brute */}
        <FunctionField
          label="Liens"
          render={(record: Record<string, unknown>) => {
            const links = record.speakerLinks as Array<{
              id: string;
              label: string;
              url: string;
            }>;

            // Si des speakerLinks existent, on les affiche
            if (links?.length) {
              return (
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}
                >
                  {links.slice(0, 2).map((l) => (
                    <Typography
                      key={l.id}
                      component="a"
                      href={l.url}
                      target="_blank"
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      sx={{
                        fontSize: "0.75rem",
                        color: mode === "dark" ? "#A78BFA" : "#6C63FF",
                        textDecoration: "none",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        maxWidth: 200,
                        display: "block",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {l.url}
                    </Typography>
                  ))}
                </Box>
              );
            }

            const photoUrl = record.photoUrl as string;
            if (photoUrl) {
              return (
                <Typography
                  component="a"
                  href={photoUrl}
                  target="_blank"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                  sx={{
                    fontSize: "0.75rem",
                    color: mode === "dark" ? "#A78BFA" : "#6C63FF",
                    textDecoration: "none",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    maxWidth: 200,
                    display: "block",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  {photoUrl}
                </Typography>
              );
            }

            return (
              <Typography
                variant="caption"
                sx={{ color: mode === "dark" ? "#4B5563" : "#94A3B8" }}
              >
                Aucun
              </Typography>
            );
          }}
        />

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
          sx={{
            color: "#EF4444",
            minWidth: 0,
            p: "6px",
            borderRadius: "8px",
            "&:hover": { background: "rgba(239,68,68,0.1)" },
          }}
        />
      </Datagrid>
    </List>
  );
};
