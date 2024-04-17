import { Authenticator } from "@aws-amplify/ui-react"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { UserProfileProvider } from "./use-user-profile.tsx"
import "@aws-amplify/ui-react/styles.css"
// import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator
      signUpAttributes={["preferred_username"]}
      formFields={{
        signUp: {
          email: {
            // placeholder: "defender@thegalaxy.com",
            order: 1,
          },
          preferred_username: {
            label: "Display name (you can change this later)",
            // placeholder: "voltron",
            order: 2,
          },
        },
      }}
    >
      <UserProfileProvider>
        <App />
      </UserProfileProvider>
    </Authenticator>
  </React.StrictMode>
)
