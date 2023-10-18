import {ChangeEvent, FormEvent, useState} from "react";

export  function useLogin() {
    const[formData, setFormData] = useState({username: '', password: ''})
    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.name;
        const name = e.currentTarget.value;
        setFormData({...formData, [value]: name})
    }



    const isValid = formData.username.length && formData.password.length;
    return {
        formData,
        changeHandler,
        isValid
    }
}