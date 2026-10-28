import { createContext, useState, useContext } from 'react';
import { apiClient, apiClientImageUpload } from '../utils/apiClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleRegister = async (formData) => {
        try {
            const res = await apiClientImageUpload.post("/auth/register", formData);
            setUser(res.data.user)
            return res.data;
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleLogin = async (formData) => {
        try {
            const res = await apiClient.post("/auth/login", formData);
            setUser(res.data.user)
            return res.data;
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleLogout = async () => {
        try {
            await apiClient.post("/auth/logout");
            setUser(null);
        } catch (error) {
            console.log(error.message);
        }
    }

    const checkAuth = async () => {
        try {
            const res = await apiClient.get("/auth/checkauth");
            setUser(res.data.user);
        } catch (error) {
            console.log(error.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }


    return (
        <AuthContext.Provider value={{ user, loading, handleRegister, handleLogin, handleLogout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}