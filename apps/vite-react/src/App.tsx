import { useAuthenticator } from "@aws-amplify/ui-react"
import { Amplify } from "aws-amplify"
import config from "vanity-usernames-backend/config"
import { useUserProfile } from "./use-user-profile"

Amplify.configure(config)

export default function App() {
  const { signOut } = useAuthenticator()
  const user = useUserProfile()
  return (
    <main>
      <h1>Hello {user?.displayName}</h1>
      <button onClick={signOut}>Sign out</button>
    </main>
  )
}
