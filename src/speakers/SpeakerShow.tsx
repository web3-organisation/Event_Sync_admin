import {
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
  ListButton,
  EditButton,
} from "react-admin";

const SpeakerShowActions = () => (
  <TopToolbar>
    <ListButton />
    <EditButton />
  </TopToolbar>
);

export const SpeakerShow = () => (
  <Show actions={<SpeakerShowActions />}>
    <SimpleShowLayout>
      <TextField source="fullName" label="Nom complet" />
      <TextField source="bio" label="Bio" />
      <TextField source="photoUrl" label="URL de la photo" />
    </SimpleShowLayout>
  </Show>
);
