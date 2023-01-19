import { useState, useEffect, createContext} from "react";
import { User } from "../api";

const userController = new User();

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
        
    useEffect(()=> {
       // Comprobar si el usuario está logueado
    }, [] )

    const login = async (accessToken) => {
        try {
            const response = await userController.getMe(accessToken);
            setUser(response)
            setToken(accessToken)
        } catch (error) {
            throw error;
        }
    }

    const data = {
        accessToken: token,
        user,
        login
    }

    return <AuthContext.Provider value={data}> {children} </AuthContext.Provider>

}

