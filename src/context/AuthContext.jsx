import { createContext } from 'react';
import { useState } from 'react';
import { loginUser, registerUser } from '../apiFunc/apiAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        try{
            const user = await loginUser(email, password);
            setUser(user);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try{
            const User = await registerUser(userData);
            setUser(User);
            setError(null);
        } catch (error) {
            setError(error.message);
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};