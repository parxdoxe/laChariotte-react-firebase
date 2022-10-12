import React from 'react';
import axios from "axios"
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js"

function Checkout(props) {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async(event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })
        if (!error) {
            console.log("Token Généré :", paymentMethod);
        }
    }

    return (
        <div className='flex flex-col'>
            <form onSubmit={handleSubmit} action="">
                <CardElement options={{
                    hidePostalCode: true
                }} />

                <button type='submit'>Payer</button>
            </form>

        </div>
    );
}

export default Checkout;