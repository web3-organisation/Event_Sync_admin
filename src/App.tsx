import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { authProvider } from "./features/auth/authProvider";
import LoginPage from "./features/auth/LoginPage";

const dataProvider = simpleRestProvider(
  import.meta.env.VITE_API_URL + "/api/admin",
);

export default function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
      requireAuth
    >
      <Resource name="events" />
    </Admin>
  );
}
