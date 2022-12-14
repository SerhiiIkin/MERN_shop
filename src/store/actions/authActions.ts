import { AppDispatch } from "..";
import axios  from "../../axios";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from "axios";
import { AuthData, AuthPayloadRegister } from "../../models/models";
import { authSlice } from "../slices/authSlice";

interface AuthResponse {
    token: string;
    user: {
        username: string;
        id: string;
        role: string;
    };
}

export function login(data: AuthData) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<AuthResponse>(
                "api/auth/login",
                data
            );

            dispatch(
                authSlice.actions.successLogin({
                    username: response.data.user.username,
                    token: response.data.token,
                    role: response.data.user.role,
                })
            );
            dispatch(authSlice.actions.fetchError(""));
        } catch (error: AxiosError | any) {
            dispatch(authSlice.actions.fetchError(error.response.data.message));
        }
    };
}

export function register(data: AuthData) {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.post<AuthPayloadRegister>(
                "api/auth/register",
                data
            );

            dispatch(
                authSlice.actions.successRegister({
                    message: response.data.message,
                })
            );
        } catch (error: AxiosError | any) {
            dispatch(authSlice.actions.fetchError(error.response.data.message));
        }
    };
}
