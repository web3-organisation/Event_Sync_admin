import {
    List,
    Datagrid,
    TextField,
    EditButton,
    DeleteButton,
    SearchInput,
} from "react-admin";

const speakerFilters = [
    <SearchInput source="q" alwaysOn key="search" />,
];

export const SpeakerList = () => (
    <List filters={speakerFilters} perPage={10}>
        <Datagrid rowClick="edit">
            <TextField source="fullName" label="Nom complet" />
            <TextField source="bio" label="Bio" />
            <TextField source="photoUrl" label="Photo URL" />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);