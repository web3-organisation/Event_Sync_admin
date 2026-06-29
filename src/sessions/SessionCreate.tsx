import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  SelectInput,
  useGetList,
  required,
  SaveButton,
  Toolbar,
  useNotify,
  useRedirect,
} from "react-admin";
import { Box, Typography, Grid } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";

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
      label="Créer la session"
      icon={<AddIcon />}
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

const SectionLabel = ({ children }: { children: string }) => (
  <Typography
    sx={{
      fontSize: "0.72rem",
      fontWeight: 700,
      color: "#6C63FF",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
      mt: 2,
      mb: 1,
      width: "100%",
    }}
  >
    {children}
  </Typography>
);

function RoomSelect() {
  const { data: rooms = [], isLoading } = useGetList("rooms", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "name", order: "ASC" },
  });
  return (
    <SelectInput
      source="roomId"
      label="Salle"
      choices={rooms.map((r) => ({ id: r.id, name: r.name }))}
      disabled={isLoading}
      validate={required("La salle est requise")}
      fullWidth
    />
  );
}

function SpeakerSelect() {
  const { data: speakers = [], isLoading } = useGetList("speakers", {
    pagination: { page: 1, perPage: 200 },
    sort: { field: "fullName", order: "ASC" },
  });
  return (
    <SelectInput
      source="speakerId"
      label="Intervenant principal"
      choices={speakers.map((s) => ({ id: s.id, name: s.fullName }))}
      disabled={isLoading}
      emptyText="Aucun intervenant"
      parse={(v: string) => (v === "" ? null : v)}
      fullWidth
    />
  );
}

export function SessionCreate() {
  const notify = useNotify();
  const redirect = useRedirect();
  const { data: events = [], isLoading: eventsLoading } = useGetList("events", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "startDate", order: "ASC" },
  });

  return (
    <Box sx={{ maxWidth: 760, mx: "auto" }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, rgba(108,99,255,0.25), rgba(236,72,153,0.1))",
            border: "1px solid rgba(108,99,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CalendarMonthIcon sx={{ fontSize: 20, color: "#A78BFA" }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: 800,
              fontFamily: "'Bricolage Grotesque', sans-serif",
              color: "#F1F5F9",
            }}
          >
            Nouvelle{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(135deg, #6C63FF, #EC4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Session
            </Box>
          </Typography>
          <Typography sx={{ color: "#4B5563", fontSize: "0.84rem" }}>
            Configurez une nouvelle session pour votre événement.
          </Typography>
        </Box>
      </Box>

      <Create
        title=" "
        mutationOptions={{
          onSuccess: () => {
            notify("Session créée avec succès", { type: "success" });
            redirect("list", "sessions");
          },
          onError: (error: any) =>
            notify(error?.message ?? "Erreur", { type: "error" }),
        }}
        sx={{
          "& .RaCreate-main": { background: "transparent", boxShadow: "none" },
        }}
      >
        <SimpleForm
          toolbar={<FormToolbar />}
          sx={{ background: "transparent", p: "0 !important" }}
        >
          <SectionLabel>Informations</SectionLabel>

          <TextInput
            source="title"
            label="Titre de la session"
            validate={required("Le titre est requis")}
            fullWidth
          />
          <TextInput
            source="description"
            label="Description (optionnel)"
            multiline
            rows={3}
            fullWidth
          />

          <SectionLabel>Horaires</SectionLabel>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              width: "100%",
            }}
          >
            <DateTimeInput
              source="startTime"
              label="Début"
              validate={required("L'heure de début est requise")}
              fullWidth
            />
            <DateTimeInput
              source="endTime"
              label="Fin"
              validate={required("L'heure de fin est requise")}
              fullWidth
            />
          </Box>

          <SectionLabel>Rattachement</SectionLabel>
          <SelectInput
            source="eventId"
            label="Événement"
            choices={events.map((e) => ({ id: e.id, name: e.title }))}
            disabled={eventsLoading}
            validate={required("L'événement est requis")}
            fullWidth
          />
          <RoomSelect />
          <SpeakerSelect />
        </SimpleForm>
      </Create>
    </Box>
  );
}
