import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  useGetList,
  required,
} from "react-admin";
import { Typography } from "@mui/material";

export function RoomEdit() {
  const { data: events = [], isLoading } = useGetList("events", {
    pagination: { page: 1, perPage: 100 },
    sort: { field: "startDate", order: "ASC" },
  });

  const eventChoices = events.map((e) => ({ id: e.id, name: e.title }));

  return (
    <Edit title="Modifier la salle" redirect="list" mutationMode="pessimistic">
      <SimpleForm sx={{ maxWidth: 560 }}>
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
          Modifier la salle
        </Typography>

        <TextInput
          source="name"
          label="Nom de la salle"
          validate={required("Le nom est requis")}
          fullWidth
        />

        <SelectInput
          source="eventId"
          label="Événement associé"
          choices={eventChoices}
          disabled={isLoading}
          validate={required("L'événement est requis")}
          fullWidth
        />
      </SimpleForm>
    </Edit>
  );
}
