import { TextInput, DateTimeInput, required, minLength } from "react-admin";
import { Box, Typography } from "@mui/material";

// ─── Style commun des inputs ──────────────────────────────────────────────────
export const inputSx = {
  mb: 0,
  "& .MuiOutlinedInput-root": {
    background: "#0d1117",
    borderRadius: "10px",
    color: "#e0e0f0",
    "& fieldset": { borderColor: "#1E293B" },
    "&:hover fieldset": { borderColor: "#6C63FF" },
    "&.Mui-focused fieldset": { borderColor: "#6C63FF", borderWidth: "1.5px" },
  },
  "& .MuiInputLabel-root": {
    color: "#4B5563",
    fontSize: "0.875rem",
    "&.Mui-focused": { color: "#7C5CFF" },
    "&.MuiInputLabel-shrink": { color: "#7C5CFF" },
  },
  "& .MuiFormHelperText-root.Mui-error": { color: "#EF4444" },
};

// ─── Label de section ─────────────────────────────────────────────────────────
const SectionLabel = ({ text }: { text: string }) => (
  <Typography
    sx={{
      color: "#4B5563",
      fontSize: "0.68rem",
      fontWeight: 700,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      mb: 2,
      display: "flex",
      alignItems: "center",
      gap: "8px",
      "&::after": {
        content: '""',
        flex: 1,
        height: "1px",
        background: "#1E293B",
      },
    }}
  >
    {text}
  </Typography>
);

// ─── Formulaire partagé ───────────────────────────────────────────────────────
export const EventFormFields = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, p: 0 }}>
    {/* Bloc infos générales */}
    <Box
      sx={{
        background: "#111827",
        borderRadius: "16px",
        p: 3,
        border: "1px solid #1E293B",
      }}
    >
      <SectionLabel text="Informations générales" />

      <TextInput
        source="title"
        label="Titre de l'événement"
        validate={[
          required("Le titre est requis"),
          minLength(2, "Minimum 2 caractères"),
        ]}
        fullWidth
        sx={{ ...inputSx, mb: 2.5 }}
      />

      <TextInput
        source="description"
        label="Description (optionnel)"
        multiline
        rows={3}
        fullWidth
        sx={{ ...inputSx, mb: 2.5 }}
      />

      <TextInput
        source="location"
        label="Lieu (optionnel)"
        fullWidth
        sx={inputSx}
      />
    </Box>

    {/* Bloc dates */}
    <Box
      sx={{
        background: "#111827",
        borderRadius: "16px",
        p: 3,
        border: "1px solid #1E293B",
      }}
    >
      <SectionLabel text="Dates & horaires" />

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <DateTimeInput
          source="startDate"
          label="Date de début"
          validate={required("La date de début est requise")}
          sx={{ ...inputSx, flex: 1, minWidth: 220 }}
        />
        <DateTimeInput
          source="endDate"
          label="Date de fin"
          validate={required("La date de fin est requise")}
          sx={{ ...inputSx, flex: 1, minWidth: 220 }}
        />
      </Box>
    </Box>
  </Box>
);
