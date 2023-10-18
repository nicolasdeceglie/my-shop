import {useReducer} from "react";
import {initialState, ordersReducer} from "@/services/orders/orders.reducer";
import * as OrdersService from "./orders.api";
import {OrderForm} from "@/model/order-form";

export function useOrdersService() {
    const [state, dispatch] = useReducer(ordersReducer, initialState);

    async function getOrders() {
        dispatch({type: 'pending', payload: true})
        try {
            const res = await OrdersService.get();
            dispatch({type: 'ordersGetSuccess', payload: res.items})
        } catch (e) {
            dispatch({type: 'error', payload: 'Orders not loaded'})
        }
    }

    async function deleteOrder(id: string) {
        dispatch({type: 'pending', payload: true})

        try {
            await OrdersService.remove(id);
            dispatch({type: 'ordersRemoveSuccess', payload: id})
        }catch (e) {
            dispatch({type: 'error', payload: 'Order not deleted'})
        }
    }

    async function addOrder(order: OrderForm) {
        dispatch({type: 'pending', payload: true})

        try {
            return await OrdersService.add(order);
        }catch (e){
            dispatch({type: 'error', payload: 'Order not added'})
            return e;
        }
    }

    async function toggleOrderStatus(id: string, status: 'pending' | 'done') {
        dispatch({type: 'pending', payload: true})

        try {
            const res = await OrdersService.toggleStatus(id, status);
            dispatch({type: 'ordersToggleStatusSuccess', payload: res})
        }catch (e) {
            dispatch({type: 'error', payload: 'Order status not changed'})
        }

    }

    return {
        actions: {
            getOrders,
            deleteOrder,
            addOrder,
            toggleOrderStatus
        },
        state
    }
}