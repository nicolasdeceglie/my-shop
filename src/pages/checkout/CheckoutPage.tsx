import clsx from 'clsx'
import {useCheckout} from "./hooks/useCheckout";
import {ServerError} from "@/shared/";

export function CheckoutPage() {
    const {
        validators,
        actions,
        user, dirty, totalCartCost,
        error} = useCheckout();

    return (
        <div>
            <h1 className="title">CHECKOUT</h1>
            <div className="text-xl my-3 border-b">
                € {totalCartCost}
            </div>

            {error && <ServerError message={error} />}

            <form className="flex flex-col gap-3" onSubmit={actions.sendOrder}>
                Your name:
                <input type="text" placeholder="your name"
                       name="name"
                       value={user.name}
                       onChange={actions.changeHandler}
                       className={clsx({'error': !validators.isNameValid && dirty})}/>
                Your email:
                <input type="text" placeholder="your email"
                       name="email"
                       value={user.email}
                       onChange={actions.changeHandler}
                       className={clsx({'error': !validators.isEmailValid && dirty})}/>
                <button type="submit" className={clsx('btn', {primary: !validators.isValid, success:validators.isValid})} disabled={!validators.isValid}>f
                    Confirm Order
                </button>
            </form>
        </div>

    )
}