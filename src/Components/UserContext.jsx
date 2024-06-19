import { createContext } from "react";
import { useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(undefined)

    return  <UserContext.Provider value={{user: user, setUser: setUser}}>
      {children}
    </UserContext.Provider>
}