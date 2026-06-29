import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  SaveButton,
  Toolbar,
  useNotify,
  useRedirect,
  useRecordContext,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SaveIcon from "@mui/icons-material/Save";

const FormToolbar = () => (
  <Toolbar
    sx={{
      background: "transparent",
      borderTop: "1px solid #1E293B",
      px: 0,
      pt: 2,
      minHeight: "auto !important",
      justifyContent: "flex-end",
    }}
  >
    <SaveButton
      label="Enregistrer"
      icon={<SaveIcon />}
      sx={{
        background: "linear-gradient(135deg, #6C63FF, #EC4899) !important",
        color: "#fff !important",
        fontWeight: 700,
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

// Must be inside Edit context to use useRecordContext
const RoomFormContent = () => {
  const record = useRecordContext();
  return (
    <>
      {/* Header inside Edit context */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, rgba(108,99,255,0.25), rgba(236,72,153,0.1))",
              border: "1px solid rgba(108,99,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MeetingRoomIcon sx={{ fontSize: 18, color: "#A78BFA" }} />
          </Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 800,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: "#F1F5F9",
            }}
          >
            Modifier{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #6C63FF, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {(record?.name as string) || "la salle"}
            </Box>
          </Typography>
        </Box>
        <Typography sx={{ color: "#4B5563", fontSize: "0.85rem", ml: "50px" }}>
          Modifiez les informations de la salle.
        </Typography>
      </Box>

      <TextInput
        source="name"
        label="Nom de la salle"
        validate={required("Le nom est requis")}
        fullWidth
      />
    </>
  );
};

export function RoomEdit() {
  const notify = useNotify();
  const redirect = useRedirect();

  return (
    <Box sx={{ maxWidth: 560, mx: "auto" }}>
      <Edit
        title=" "
        redirect="list"
        mutationMode="pessimistic"
        mutationOptions={{
          onSuccess: () => {
            notify("Salle modifiée avec succès", { type: "success" });
            redirect("list", "rooms");
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) =>
            notify(error?.message ?? "Erreur", { type: "error" }),
        }}
        sx={{ "& .RaEdit-main": { background: "transparent", boxShadow: "none" } }}
      >
        <SimpleForm
          toolbar={<FormToolbar />}
          sx={{ background: "transparent", p: "0 !important" }}
        >
          <RoomFormContent />
        </SimpleForm>
      </Edit>
    </Box>
  );
}
