import { useState, useEffect, createContext} from "react";
import { Auth, User } from "../api";

const userController = new User();
const authController = new Auth();

export const AuthContext = createContext();

export function AuthProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)
        
    useEffect(()=> {
       // Comprobar si el usuario está logueado
       (async _ => {
        const accessToken = authController.getAccessToken();
        const refreshToken = authController.getAccessToken();

        await login(accessToken)

        setLoading(false);
       })()
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

    if (loading) return null;

    return <AuthContext.Provider value={data}> {children} </AuthContext.Provider>
}

