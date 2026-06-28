import {
  Edit,
  SimpleForm,
  SaveButton,
  Toolbar,
  useNotify,
  useRedirect,
} from "react-admin";
import { Box, Typography } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { EventFormFields } from "./EventFormFields";

const EditToolbar = () => (
  <Toolbar
    sx={{
      background: "transparent",
      borderTop: "1px solid #1E293B",
      px: 3,
      py: 2,
      justifyContent: "flex-end",
      minHeight: "auto !important",
    }}
  >
    <SaveButton
      label="Enregistrer"
      icon={<SaveOutlinedIcon />}
      sx={{
        background: "linear-gradient(135deg, #6C63FF, #EC4899) !important",
        color: "#fff !important",
        fontWeight: 700,
        fontSize: "0.85rem",
        borderRadius: "10px",
        px: 3.5,
        py: 1.2,
        border: "none !important",
        boxShadow: "0 4px 16px rgba(108,99,255,0.3)",
        transition: "all .25s ease",
        "&:hover": {
          background: "linear-gradient(135deg, #5A4BFF, #d43d8a) !important",
          boxShadow: "0 6px 24px rgba(108,99,255,0.5) !important",
          transform: "translateY(-1px)",
        },
      }}
    />
  </Toolbar>
);

const PageHeader = () => (
  <Box sx={{ mb: 3 }}>
    <Typography
      sx={{
        color: "#F8FAFC",
        fontSize: "1.6rem",
        fontWeight: 800,
        fontFamily: "'Bricolage Grotesque', sans-serif",
        lineHeight: 1.2,
      }}
    >
      Modifier l&apos;
      <Box
        component="span"
        sx={{
          background: "linear-gradient(135deg, #7C5CFF, #EC4899)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        événement
      </Box>
    </Typography>
    <Typography sx={{ color: "#4B5563", fontSize: "0.87rem", mt: 0.5 }}>
      Les modifications seront appliquées après confirmation.
    </Typography>
  </Box>
);

export const EventEdit = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  return (
    <Box sx={{ maxWidth: 760, mx: "auto", px: { xs: 2, md: 0 } }}>
      <PageHeader />
      <Edit
        title=" "
        mutationMode="pessimistic"
        mutationOptions={{
          onSuccess: () => {
            notify("Événement mis à jour", { type: "success" });
            redirect("list", "events");
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            notify(error?.message ?? "Erreur lors de la modification", {
              type: "error",
            });
          },
        }}
        sx={{
          "& .RaEdit-main": { background: "transparent", boxShadow: "none" },
        }}
      >
        <SimpleForm
          toolbar={<EditToolbar />}
          sx={{
            background: "transparent",
            p: "0 !important",
            "& .RaSimpleForm-form": {
              display: "flex",
              flexDirection: "column",
              gap: 0,
            },
          }}
        >
          <EventFormFields />
        </SimpleForm>
      </Edit>
    </Box>
  );
};
