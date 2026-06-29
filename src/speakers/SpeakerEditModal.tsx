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
  return (
    <DialogTitle
      sx={{
        background: "linear-gradient(135deg, #6C63FF15, #EC489915)",
        borderBottom: "1px solid rgba(108,99,255,0.1)",
        px: 3,
        py: 2,
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
              color: "#0F172A",
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
          <Typography sx={{ fontSize: "0.78rem", color: "#94A3B8", mt: 0.3 }}>
            Modifiez les informations de l'intervenant.
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={onClose}
        size="small"
        sx={{
          color: "#94A3B8",
          "&:hover": { color: "#0F172A", background: "rgba(0,0,0,0.05)" },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </DialogTitle>
  );
};

// ─── SpeakerEditModal ─────────────────────────────────────────────────────────
export const SpeakerEditModal = () => {
  const redirect = useRedirect();
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
          background: "#FFFFFF",
          boxShadow: "0 24px 80px rgba(108,99,255,0.12)",
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
          "& .RaEdit-main": { background: "transparent", boxShadow: "none" },
        }}
      >
        <SpeakerDialogHeader onClose={handleClose} />
        <DialogContent sx={{ px: 3, pt: 3, pb: 1 }}>
          <SimpleForm
            toolbar={<EditToolbar />}
            sx={{ background: "transparent", p: "0 !important" }}
          >
            <TextInput
              source="fullName"
              label="Nom complet"
              validate={required("Le nom est requis")}
              fullWidth
            />
            <TextInput
              source="photoUrl"
              label="URL de la photo (optionnel)"
              fullWidth
              helperText="Ex : https://example.com/photo.jpg"
            />
            <TextInput
              source="bio"
              label="Biographie"
              multiline
              rows={4}
              fullWidth
            />
          </SimpleForm>
        </DialogContent>
      </Edit>
    </Dialog>
  );
};
