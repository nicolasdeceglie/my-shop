import clsx from "clsx";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Product} from "@/model/product";
import {useCloudinary} from "@/shared/";

export interface CMSProductFormProps {
    activeItem: Partial<Product> | null; // questo active item si occupa di ricevere le informazioni del prodotto selezionato oer poii adnare a gestire le modifiche
    onClose: () => void;
    onAdd: (item: Partial<Product>) => void;
    onEdit: (item: Partial<Product>) => void;
}

const initialState: Partial<Product> = {
    name: '', cost: 0, description: '', tmb: '', img: ''
}


export function CMSProductForm(props: CMSProductFormProps) {

    const [formData, setFormData] = useState(initialState);
    const [dirty, setDirty] = useState<boolean>(false);
    const {openWidget} = useCloudinary();
    useEffect(() => {
        if (props.activeItem?.id){
            setFormData({...props.activeItem});
        }else{
            setFormData(initialState);
        }
    }, [props.activeItem]);


    function changeHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        setFormData(s => ({...s, [name]: value}))
        setDirty(true);
    }

    function saveHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (props.activeItem?.id) {
            props.onEdit(formData);
        } else {
            props.onAdd(formData);
        }
    }

    function uploadHandler() {
        openWidget()
            .then(res => {
                setFormData(s => ({...s, ...res}))
            });
    }

    const isNameValid = formData.name?.length;
    const isCostValid = formData.cost! > 0;
    const isDescValid = formData.description?.length;

    const isValid = isNameValid && isCostValid && isDescValid;

    return (
        <div className={clsx("fixed bg-slate-200 z-10 text-black top-0 w-96 h-full transition-all overflow-auto", {'-right-96': !props.activeItem, 'right-0': props.activeItem})}>
            <form onSubmit={saveHandler}>
                <div className="flex justify-around h-16">
                    <button
                        className="text-white w-1/2 bg-green-500 hover:bg-green-600 disabled:opacity-20"
                        disabled={!isValid}
                        type="submit"
                    >SAVE
                    </button>
                    <button
                        className="text-white w-1/2 bg-slate-500 hover:bg-slate-600"
                        onClick={props.onClose} type="button">CLOSE
                    </button>
                </div>

                {
                    formData.img && <img src={formData.img} className="w-full" alt={formData.name}/>
                }

                <div className="flex flex-col gap-3 mx-3 mt-16">
                    Product Name:
                    <input className={clsx({'error': !isNameValid && dirty})} name="name"
                           type="text" value={formData?.name} onChange={changeHandler}/>
                    Product Cost:
                    <input type="number" className={clsx({'error': !isCostValid && dirty})}
                           value={formData?.cost} name="cost" onChange={changeHandler}/>

                    Description
                    <textarea
                        className={clsx({'error' : !isDescValid && dirty})}
                        value={formData.description} name="description" onChange={changeHandler}></textarea>
                    <button className="primary btn" type="button" onClick={uploadHandler}>
                        UPLOAD IMAGE
                    </button>
                </div>
            </form>

        </div>
    )
}