import { Edit, SimpleForm, TextInput, required, useRecordContext } from "react-admin";

const SpeakerTitle = () => {
    const record = useRecordContext();
    return <span>Modifier : {record ? record.fullName : ""}</span>;
};

export const SpeakerEdit = () => (
    <Edit title={<SpeakerTitle />} redirect="list">
        <SimpleForm>
            <TextInput source="fullName" label="Nom complet" validate={required()} fullWidth />
            <TextInput source="photoUrl" label="URL de la photo" fullWidth />
            <TextInput source="bio" label="Bio" multiline rows={4} fullWidth />
        </SimpleForm>
    </Edit>
);