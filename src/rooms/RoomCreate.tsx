import { Create, SimpleForm, TextInput, required } from "react-admin";
import { Typography } from "@mui/material";

export function RoomCreate() {
  return (
    <Create title="Nouvelle salle" redirect="list">
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
          Nouvelle salle
        </Typography>

        <TextInput
          source="name"
          label="Nom de la salle"
          validate={required("Le nom est requis")}
          fullWidth
        />
      </SimpleForm>
    </Create>
  );
}
