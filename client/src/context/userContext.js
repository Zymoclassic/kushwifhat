import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/login`)
    }, [currentUser])

    return <UserContext.Provider value = {{currentUser, setCurrentUser}} >{children}</UserContext.Provider>
}

export default UserProvider;