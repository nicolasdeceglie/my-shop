import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import {selectCartList, selectTotalCartCost, useCart} from "@/services/cart";
import {OrderForm, OrderUser} from "@/model/order-form";
import {useOrdersService} from "@/services/orders";
import {ClientResponseError} from "pocketbase";
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const initialState: OrderUser = { name: '', email: '' };

export const useCheckout= () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<OrderUser>(initialState)
    const totalCartCost = useCart(selectTotalCartCost)
    const [dirty, setDirty] = useState(false);
    const order = useCart(selectCartList)
    const clearCart = useCart(state => state.clearCart);
    const {actions, state}  = useOrdersService()
    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const name = e.currentTarget.name
        const value = e.currentTarget.value
        setUser(state => ({...state, [name]: value}))
        setDirty(true)
    }

    function sendOrder(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
        const orderInfo: OrderForm ={
            user,
            order,
            total : totalCartCost,
            status: 'pending'
        }
        actions.addOrder(orderInfo)
            .then((res) => {
                if(! (res instanceof ClientResponseError)) {
                    clearCart();
                    navigate('/thankyou');
                }
            })

    }
    const isNameValid = user.name.length;
    const isEmailValid = user.email.match(EMAIL_REGEX);
    const isValid = isNameValid && isEmailValid;

    return {
        validators: {
            isNameValid,
            isEmailValid,
            isValid,
        },
        actions: {
            sendOrder,
            changeHandler,
        },
        user,
        totalCartCost,
        dirty,
        error: state.error,
    }
}