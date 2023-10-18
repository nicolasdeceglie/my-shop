import {PropsWithChildren, ReactNode} from "react";
import {selectAuthIsLogged, useAuth} from "@/services/auth";

interface IfLoggedProps {
    else?: ReactNode;
}
export function IfLogged(props: PropsWithChildren<IfLoggedProps>) {
    const isLogged = useAuth(selectAuthIsLogged);
    return (
        <>
            {isLogged ? props.children : props.else}
        </>
    )
}