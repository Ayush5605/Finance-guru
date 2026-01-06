import React from "react";
import axios from "axios";

export default function Checkout(){
    const openCheckout=async()=>{


        try{

            const res=await axios.post("http://localhost:5000/api/payment/create-order",
                {amount:49},
                {
                    headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            const {order}=res.data;


            const options={
            key:import.meta.env.VITE_RAZORPAY_KEY,
            amount:order.amount,
            currency:"INR",
            order_id:order.id,
            name:"Finance Guru",
            description:"Premium subscription",
            handler:async function(response){
                await axios.post(
                    "http://localhost:5000/api/payment/verify-payment",
                    response,
                    {
                       headers:{
                        Authorization:`Bearer ${localStorage.getItem("token")}`,
                       },
                    }
                );
                alert("Payement successfull & premium unlocked !!");

            },
            theme:{
                color:"#3399cc"
            }

        }
        const rzp=new window.Razorpay(options);
        rzp.open();
        
        }catch(err){
            console.error(err);
            alert("Payment failed");
            
        }

        
    };

    return(
        <button onClick={openCheckout}
        style={{
             marginTop: "20px",
          padding: "12px 24px",
          backgroundColor: "#3399cc",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "16px",

        }}>
            Pay ₹49
        </button>
    )
}