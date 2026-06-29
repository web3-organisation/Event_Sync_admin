import {
  Create,
  SimpleForm,
  TextInput,
  required,
  useRedirect,
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

// ─── Toolbar personnalisée ────────────────────────────────────────────────────
const CreateToolbar = () => (
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
      label="Créer l'intervenant"
      icon={<PersonAddIcon />}
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

// ─── SpeakerCreateModal ───────────────────────────────────────────────────────
export const SpeakerCreateModal = () => {
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
      {/* Header */}
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
        <Box>
          <Typography
            sx={{
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "#0F172A",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            Nouvel{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #6C63FF, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              intervenant
            </Box>
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "#94A3B8", mt: 0.3 }}>
            Remplissez les informations du nouvel intervenant.
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            color: "#94A3B8",
            "&:hover": { color: "#0F172A", background: "rgba(0,0,0,0.05)" },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pt: 3, pb: 1 }}>
        <Create
          resource="speakers"
          redirect={false}
          mutationOptions={{ onSuccess: handleClose }}
          sx={{ "& .RaCreate-main": { background: "transparent", boxShadow: "none" } }}
        >
          <SimpleForm
            toolbar={<CreateToolbar />}
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
        </Create>
      </DialogContent>
    </Dialog>
  );
};
