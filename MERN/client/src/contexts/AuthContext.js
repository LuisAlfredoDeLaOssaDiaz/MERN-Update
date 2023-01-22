import { useState, useEffect, createContext} from "react";
import { Auth, User } from "../api";
import { hasExpiredToken } from "../utils";

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
        (async ()=> {
            const accessToken = authController.getAccessToken() ;
            const refreshToken = authController.getRefreshToken() ;

            
            if (!accessToken || !refreshToken) {
            logout();
            setLoading(false);
            return;
        }
        
        if (hasExpiredToken(accessToken)) {
            console.log("access");
            // Ha Caducado
            if (hasExpiredToken(refreshToken)) {
                console.log("refresh");
                logout();
            } else {
                await reLogin(refreshToken);
            }
        } else {
            await login(accessToken);
        }
        
        setLoading(false);
       })();
    } ); // [] );

    const reLogin = async (refreshToken) => {
        try {
            
            const {accessToken} = await authController.refreshAccesToken(refreshToken);
            authController.setAccessToken(accessToken);
            await login(accessToken);

        } catch (error) {
            console.error(error);
        }
    }

    const login = async (accessToken) => {
        try {
            const response = await userController.getMe(accessToken);
            setUser(response)
            setToken(accessToken)
        } catch (error) {
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        authController.removeTokens();
    }

    const data = {
        accessToken: token,
        user,
        login,
        logout
    }

    if (loading) return null ;

    return <AuthContext.Provider value={data}> {children} </AuthContext.Provider>
}

