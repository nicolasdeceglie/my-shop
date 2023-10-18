import {PropsWithChildren} from "react";
import {selectAuthIsLogged, useAuth} from "@/services/auth";
import {Navigate} from "react-router-dom";

export function PrivateRoute (props: PropsWithChildren<any>){
    const isLogged = useAuth(selectAuthIsLogged);
    return (
        <div>
            {isLogged ? props.children : <Navigate to="/login" />}
        </div>
    )
}