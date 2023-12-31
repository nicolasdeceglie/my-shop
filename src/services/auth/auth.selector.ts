import {AuthState} from "@/services/auth/useAuth";

export const selectAuthToken = (state: AuthState) => state.token;
export const selectAuthIsLogged = (state: AuthState) => state.isLogged;
export const selectAuthError = (state: AuthState) => state.error;