import {Order} from "@/model/order";
import {OrdersActions} from "@/services/orders/orders.actions";

type OrdersState = {
    orders: Order[];
    pending: boolean;
    error: string | null;
}

export const initialState: OrdersState = {
    orders: [],
    pending: false,
    error: null
}

export function ordersReducer(state: OrdersState, action: OrdersActions){
    switch (action.type) {
        case 'ordersGetSuccess':
            return {...state, orders: action.payload, pending: false, error: null}
        case 'ordersToggleStatusSuccess':
            return {...state, orders: state.orders.map(order => order.id === action.payload.id ? action.payload : order), pending: false, error: null}
        case 'ordersRemoveSuccess':
            return {...state, orders: state.orders.filter(order => order.id !== action.payload), pending: false, error: null}
        case 'pending':
            return {...state, pending: action.payload, error: null}
        case 'error':
            return {...state, error: action.payload, pending: false}
    }
}