import {Product} from "@/model/product";
import {ProductsActions} from "@/services/products/products.actions";

export interface ProductsState {
    products: Product[];
    pending: boolean;
    error: string | null;
    activeItem: Partial<Product> | null;
}
export const initialState: ProductsState = {
    pending: false,
    products: [],
    activeItem: null,
    error: null
}


export function productsReducer(state: ProductsState, action: ProductsActions){
    const {type, payload} = action;
    console.log(action)
    switch (type){
        case 'productGetSuccess':
            return {...state, pending: false, products: payload, error : null}
        case 'productDeleteSuccess':
            return {...state,
                pending: false,
                products: state.products.filter(p => p.id !== payload),
                error: null,
                activeItem: null}
        case 'productAddSuccess':
            return {...state,
                pending: false,
                products: [...state.products, payload],
                error: null,
                activeItem: null}
        case 'productEditSuccess':
            return {...state,
                pending: false,
                products: state.products.map(p => p.id === payload.id ? payload : p),
                error: null,}
        case 'productSetActive':
            return {...state, activeItem: payload}
        case 'pending':
            return {...state, pending: payload, error: null}
        case 'error':
            return {...state, pending: false, error: payload}
    }
}