import {Order} from "@/model/order";

export type OrdersGetSuccess = { type: 'ordersGetSuccess', payload: Order[] }
export type OrderToggleStatusSuccess = { type: 'ordersToggleStatusSuccess', payload: Order }
export type OrderDeleteSuccess = { type: 'ordersRemoveSuccess', payload: string }
export type Pending = { type: 'pending', payload: boolean }
export type Error = { type: 'error', payload: string }

export type OrdersActions =
    OrdersGetSuccess |
    OrderToggleStatusSuccess |
    OrderDeleteSuccess |
    Pending |
    Error;