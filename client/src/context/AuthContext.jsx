import React, { createContext, useReducer, useContext, useEffect } from "react";
import api from "../api/client";

const AuthContext = createContext();

// Custom hook to easily access auth context
export const useAuth = () => useContext(AuthContext);

const initialState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token") || null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Effect to sync state changes with localStorage
  useEffect(() => {
    if (state.token) {
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [state.token, state.user]);

  // Auth actions
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    dispatch({ type: "LOGIN", payload: { token: data.token, user: data.user } });
  };

  const register = async (userData) => {
    // The register endpoint might not return a token immediately,
    // depending on backend logic (e.g., email verification).
    await api.post("/auth/register", userData);
  };

  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};