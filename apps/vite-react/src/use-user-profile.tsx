import type { PropsWithChildren } from "react"
import { useState, createContext, useEffect, useContext } from "react"
import { useAuthenticator } from "@aws-amplify/ui-react"

type UserProfile = {
  /**
   * the sub
   */
  id: string
  /**
   * the actual email
   */
  email: string
  /**
   * "preferred_username" but without the alias attributes
   */
  displayName: string
  /**
   * whether the user is verified
   * @default false
   */
  isVerified: boolean
}

const UserProfileContext = createContext<UserProfile | null>(null)

async function fetchUserProfile(): Promise<UserProfile> {
  // const session = await fetchAuthSession()
  // const attributes = await fetchUserAttributes()
  // const user = await getCurrentUser()
  // console.log("got user", user)
  // return {
  //   id: attributes.sub,
  //   email: attributes.email,
  //   displayName: attributes.preferred_username,
  //   isVerified: attributes.email_verified,
  // }
  return {} as any;
}

export function UserProfileProvider({ children }: PropsWithChildren<{}>) {
  const { authStatus } = useAuthenticator()
  const [user, setUser] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (user && authStatus === "unauthenticated") {
      setUser(null)
    }
    if (!user && authStatus === "authenticated") {
      fetchUserProfile().then(setUser)
    }
  }, [authStatus])

  return (
    <UserProfileContext.Provider value={user}>
      {children}
    </UserProfileContext.Provider>
  )
}

export function useUserProfile() {
  const context = useContext(UserProfileContext)
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider")
  }
  return context
}
