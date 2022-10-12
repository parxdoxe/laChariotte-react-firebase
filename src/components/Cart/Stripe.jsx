import React from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Checkout from './Checkout'

const PUBLIC_KEY = "pk_test_51LfL2UGqQDJ1FK65Os9BN79ZZ0En8p5UTKNq8mcngvZA2wMcCfhWkVpb0zwOaGszTaT83rUo1sd7D4SyKnFjrrzT00pab8XsEL"
const stripeTestPromise = loadStripe(PUBLIC_KEY)

function Stripe(props) {
    return (
        <div>
            <Elements stripe={stripeTestPromise}> 
                <Checkout />
            </Elements>
        </div>
    );
}

export default Stripe;

