import { Create, SimpleForm, TextInput, required } from "react-admin";

export const SpeakerCreate = () => (
    <Create redirect="list">
        <SimpleForm>
            <TextInput source="fullName" label="Nom complet" validate={required()} fullWidth />
            <TextInput source="photoUrl" label="URL de la photo" fullWidth />
            <TextInput source="bio" label="Bio" multiline rows={4} fullWidth />
        </SimpleForm>
    </Create>
);