import { useState } from "react";
import { Users } from "./Context";

export default function UsersProvider({children}) {
    const [authe,setAuthe] = useState({})
    return(
        <Users.Provider value={{authe, setAuthe}}>{children}</Users.Provider>
    )
}