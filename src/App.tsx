import { Admin, Resource } from "react-admin";
import { dataProvider } from "./lib/dataProvider";
import { authProvider } from "./features/auth/authProvider";
import LoginPage from "./features/auth/LoginPage";

import { EventList, EventCreate, EventEdit } from "./events";

import { SpeakerCreateModal } from "./speakers/SpeakerCreateModal";
import { SpeakerEditModal } from "./speakers/SpeakerEditModal";
import { SpeakerList } from "./speakers/SpeakerList";
import { SpeakerShow } from "./speakers/SpeakerShow";

import { SessionList, SessionCreate, SessionEdit } from "./sessions";

import { RoomList, RoomCreate, RoomEdit } from "./rooms";

import EventIcon from "@mui/icons-material/Event";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

export default function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      requireAuth
    >
      <Resource
        name="events"
        list={EventList}
        create={EventCreate}
        edit={EventEdit}
        icon={EventIcon}
        options={{ label: "Événements" }}
      />
      <Resource
        name="speakers"
        list={SpeakerList}
        create={SpeakerCreateModal}
        edit={SpeakerEditModal}
        show={SpeakerShow}
        icon={PeopleIcon}
        options={{ label: "Intervenants" }}
      />
      <Resource
        name="sessions"
        list={SessionList}
        create={SessionCreate}
        edit={SessionEdit}
        icon={CalendarMonthIcon}
        options={{ label: "Sessions" }}
      />
      <Resource
        name="rooms"
        list={RoomList}
        create={RoomCreate}
        edit={RoomEdit}
        icon={MeetingRoomIcon}
        options={{ label: "Salles" }}
      />
    </Admin>
  );
}
