import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch, useSelector } from 'react-redux';
import { bookClass } from "../../redux/actions/paymentAction"
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Stripe(props) {

    const dispatch = useDispatch();

    const { id } = useParams();
    console.log(typeof id)

    const { success } = useSelector((state) => state.bookClassReducer)
    console.log(success)
    const tokenHandler = (token) => {
        dispatch(bookClass(id, token, props.amount, props.mentorData, props.classDetails))
        console.log(props.amount)
        console.log("hulla")
        // console.log(d)
        // console.log(token)
        // console.log(result)
    }

    const retrievedUserData = localStorage.getItem('accountHolderData')

    const accountHolderProfileData = JSON.parse(retrievedUserData)

    return (
        <StripeCheckout
            name={props.mentorData[0].name}
            description="Mentor"
            image={props.mentorData[0].profileimage.url}
            ComponentClass="div"
            panelLabel="Book Class"
            amount={props.amount * 100}
            email={accountHolderProfileData.email}
            token={tokenHandler}
            stripeKey="pk_test_51MgVZKSAK7f8uX5jyq2mdSi8K4PtZgIq0JfL8tTpPfHfIR8f1SM2ZGluyw1Pw9G3rIZxbl5ycwHBK9pxw8mtORp30060l0Eblv"
            currency='INR'
        >
            <Button>Continue</Button>
        </StripeCheckout >
    )
}
