import { Admin, Resource } from "react-admin";
import dataProvider from "./dataProvider";
import { SpeakerList } from "./speakers/SpeakerList";
import { SpeakerCreateModal } from "./speakers/SpeakerCreateModal";
import { SpeakerEditModal} from "./speakers/SpeakerEditModal";
import { SpeakerShow } from "./speakers/SpeakerShow";

export const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource
            name="speakers"
            list={SpeakerList}
            create={SpeakerCreateModal}
            edit={SpeakerEditModal}
            show={SpeakerShow}
        />
    </Admin>
);

