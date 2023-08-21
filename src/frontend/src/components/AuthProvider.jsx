import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [tokenExists, setTokenExists] = useState(!!localStorage.getItem("token"));

    const login = (token) => {
        localStorage.setItem("token", token);
        setTokenExists(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setTokenExists(false);
    };

    return (
        <AuthContext.Provider value={{ tokenExists, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
