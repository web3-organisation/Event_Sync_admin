import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  useRedirect,
  useRecordContext,
  SaveButton,
  Toolbar,
} from "react-admin";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useThemeMode } from "../lib/ThemeContext";

// ─── Toolbar ─────────────────────────────────────────────────────────────────
const EditToolbar = () => (
  <Toolbar
    sx={{
      background: "transparent",
      borderTop: "1px solid rgba(108,99,255,0.12)",
      px: 0,
      minHeight: "auto !important",
      justifyContent: "flex-end",
      pt: 2,
      mt: 1,
    }}
  >
    <SaveButton
      label="Enregistrer"
      icon={<SaveIcon />}
      sx={{
        background: "linear-gradient(135deg, #6C63FF, #EC4899) !important",
        color: "#fff !important",
        fontWeight: 700,
        fontSize: "0.85rem",
        borderRadius: "10px",
        px: 3,
        py: 1.1,
        border: "none !important",
        boxShadow: "0 4px 14px rgba(108,99,255,0.3)",
        "&:hover": {
          background: "linear-gradient(135deg, #5A4BFF, #d43d8a) !important",
          boxShadow: "0 6px 20px rgba(108,99,255,0.5) !important",
          transform: "translateY(-1px)",
        },
      }}
    />
  </Toolbar>
);

// ─── Header avec avatar ────────────────────────────────────────────────────────
const SpeakerDialogHeader = ({ onClose }: { onClose: () => void }) => {
  const record = useRecordContext();
  const { mode } = useThemeMode();
  return (
    <DialogTitle
      component="div"
      sx={{
        background:
          mode === "dark"
            ? "linear-gradient(135deg, rgba(108,99,255,0.12), rgba(236,72,153,0.12))"
            : "linear-gradient(135deg, rgba(108,99,255,0.08), rgba(236,72,153,0.08))",
        borderBottom: "1px solid",
        borderColor:
          mode === "dark" ? "rgba(108,99,255,0.15)" : "rgba(108,99,255,0.1)",
        px: 4,
        py: 3,
        m: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={record?.photoUrl as string}
          alt={record?.fullName as string}
          sx={{
            width: 44,
            height: 44,
            background: "linear-gradient(135deg, #6C63FF, #EC4899)",
            fontWeight: 700,
          }}
        >
          {(record?.fullName as string)?.[0]?.toUpperCase()}
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontSize: "1.05rem",
              fontWeight: 800,
              color: mode === "dark" ? "#E2E8F0" : "#0F172A",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            Modifier{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #6C63FF, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {record?.fullName as string}
            </Box>
          </Typography>
          <Typography
            sx={{
              fontSize: "0.78rem",
              color: mode === "dark" ? "#64748B" : "#94A3B8",
              mt: 0.4,
            }}
          >
            Modifiez les informations de l&apos;intervenant.
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          color: "#64748B",
          "&:hover": {
            color: mode === "dark" ? "#E2E8F0" : "#0F172A",
            background:
              mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </DialogTitle>
  );
};

const inputSx = (mode: "dark" | "light") => ({
  mb: 2.5,
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
  "& .MuiInputLabel-root": {
    color: mode === "dark" ? "#64748B" : "#94A3B8",
    "&.Mui-focused": { color: "#6C63FF" },
  },
  "& .MuiFormHelperText-root": {
    color: mode === "dark" ? "#4B5563" : "#94A3B8",
  },
});

// ─── SpeakerEditModal ─────────────────────────────────────────────────────────
export const SpeakerEditModal = () => {
  const redirect = useRedirect();
  const { mode } = useThemeMode();
  const handleClose = () => redirect("list", "speakers");

  return (
    <Dialog
      open
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "18px",
          background: mode === "dark" ? "#0F172A" : "#FFFFFF",
          border: "1px solid",
          borderColor: mode === "dark" ? "#1E293B" : "#E2E8F0",
          boxShadow:
            mode === "dark"
              ? "0 24px 80px rgba(0,0,0,0.5)"
              : "0 24px 80px rgba(108,99,255,0.12)",
          overflow: "hidden",
        },
      }}
    >
      <Edit
        resource="speakers"
        redirect={false}
        title=" "
        mutationOptions={{ onSuccess: handleClose }}
        mutationMode="pessimistic"
        sx={{
          "& .RaEdit-main": {
            background: "transparent",
            boxShadow: "none",
            mt: 0,
          },
          "& .RaEdit-card": { background: "transparent", boxShadow: "none" },
          "& .RaTopToolbar": { display: "none" },
        }}
      >
        <SpeakerDialogHeader onClose={handleClose} />
        <DialogContent sx={{ px: 4, pt: "32px !important", pb: 3 }}>
          <SimpleForm
            toolbar={<EditToolbar />}
            sx={{
              background: "transparent",
              "& .MuiCardContent-root": { p: "0 !important" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                mt: 2,
                width: "100%",
              }}
            >
              <TextInput
                source="fullName"
                label="Nom complet"
                validate={required("Le nom est requis")}
                fullWidth
                sx={{ ...inputSx(mode), mb: 0 }}
              />
              <TextInput
                source="photoUrl"
                label="URL de la photo (optionnel)"
                fullWidth
                helperText="Ex : https://example.com/photo.jpg"
                sx={{ ...inputSx(mode), mb: 0 }}
              />
              <TextInput
                source="bio"
                label="Biographie"
                multiline
                rows={4}
                fullWidth
                sx={{ ...inputSx(mode), mb: 0 }}
              />
            </Box>
          </SimpleForm>
        </DialogContent>
      </Edit>
    </Dialog>
  );
};
