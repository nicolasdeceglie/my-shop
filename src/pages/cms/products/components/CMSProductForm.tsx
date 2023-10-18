import {Product} from "@/model/product";

export interface CMSProductFormProps {
    activeItem: Partial<Product> | null; // questo active item si occupa di
}


export function CMSProductForm(props: CMSProductFormProps) {
    return (
        <div className="fixed bg-slate-200 z-10 text-black top-0 w-96 right-0">
            {props.activeItem?.name}
        </div>
    )
}