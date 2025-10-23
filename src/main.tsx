import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  AuthProvider,
  JobsProvider,
  ApplicationsProvider,
  DonationsProvider,
  MessagesProvider,
  NotificationsProvider,
} from "./contexts";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <JobsProvider>
      <ApplicationsProvider>
        <DonationsProvider>
          <MessagesProvider>
            <NotificationsProvider>
              <App />
            </NotificationsProvider>
          </MessagesProvider>
        </DonationsProvider>
      </ApplicationsProvider>
    </JobsProvider>
  </AuthProvider>
);