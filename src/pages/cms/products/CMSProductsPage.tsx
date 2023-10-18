import {useProductsService} from "@/services/products/";
import {useEffect} from "react";
import {ServerError, Spinner} from "@/shared/";
import {CMSProductsList} from "./components/CMSProductsList";
import {CMSProductForm} from "./components/CMSProductForm";
export function CMSProductsPage() {
    const { actions, state } = useProductsService();

    useEffect(() => {
        actions.getProducts().then(r => console.log(r));
    }, []);

    return (
        <div>
            <h1 className="title">CMS</h1>

            <hr className="my-8"/>

            {state.pending && <Spinner />}
            {state.error && <ServerError message={state.error}/>}

            <CMSProductForm activeItem={state.activeItem}/>

            <CMSProductsList
                items={state.products}
                activeItem={state.activeItem}
                onEditItem={actions.setActiveItem}
                onDeleteItem={actions.deleteProduct}
            />
        </div>
    )
}
