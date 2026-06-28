import {
  Create,
  SimpleForm,
  TextInput,
  DateTimeInput,
  SelectInput,
  useGetList,
  required,
} from "react-admin";
import { Box, Typography } from "@mui/material";

function RoomSelect() {
  const { data: rooms = [], isLoading } = useGetList("rooms", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "name", order: "ASC" },
  });

  const choices = rooms.map((r) => ({ id: r.id, name: r.name }));

  return (
    <SelectInput
      source="roomId"
      label="Salle"
      choices={choices}
      disabled={isLoading}
      validate={required("La salle est requise")}
      fullWidth
    />
  );
}

// ─── Sélecteur d'intervenants filtré par événement ────────────────────────────
function SpeakerSelect() {
  const { data: speakers = [], isLoading } = useGetList("speakers", {
    pagination: { page: 1, perPage: 200 },
    sort: { field: "fullName", order: "ASC" },
  });

  const choices = speakers.map((s) => ({ id: s.id, name: s.fullName }));

  return (
    <SelectInput
      source="speakerId"
      label="Intervenant principal"
      choices={choices}
      disabled={isLoading}
      emptyText="Aucun intervenant"
      parse={(v: string) => (v === "" ? null : v)}
      fullWidth
    />
  );
}

// ─── SessionCreate ────────────────────────────────────────────────────────────
export function SessionCreate() {
  const { data: events = [], isLoading: eventsLoading } = useGetList("events", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "startDate", order: "ASC" },
  });

  const eventChoices = events.map((e) => ({ id: e.id, name: e.title }));

  return (
    <Create title="Nouvelle session" redirect="list">
      <SimpleForm
        sx={{
          maxWidth: 720,
          "& .MuiFormHelperText-root": { fontSize: "0.75rem" },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#0F172A",
            mb: 2,
            pb: 1,
            borderBottom: "2px solid #EEF1F7",
            width: "100%",
          }}
        >
          Informations de la session
        </Typography>

        <TextInput
          source="title"
          label="Titre"
          validate={required("Le titre est requis")}
          fullWidth
        />

        <TextInput
          source="description"
          label="Description"
          multiline
          rows={3}
          fullWidth
        />

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

        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 700,
            color: "#475569",
            mt: 2,
            mb: 1,
            width: "100%",
          }}
        >
          Rattachement
        </Typography>

        <SelectInput
          source="eventId"
          label="Événement"
          choices={eventChoices}
          disabled={eventsLoading}
          validate={required("L'événement est requis")}
          fullWidth
        />

        <RoomSelect />

        <SpeakerSelect />
      </SimpleForm>
    </Create>
  );
}
