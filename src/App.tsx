import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { SpeakerList } from "./speakers/SpeakerList";
import { SpeakerCreate } from "./speakers/SpeakerCreate";
import { SpeakerEdit } from "./speakers/SpeakerEdit";
import { SpeakerShow } from "./speakers/SpeakerShow";

export const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource
            name="speakers"
            list={SpeakerList}
            create={SpeakerCreate}
            edit={SpeakerEdit}
            show={SpeakerShow}
        />
    </Admin>
);