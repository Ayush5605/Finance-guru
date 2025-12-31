import React from "react";


export default function Checkout(){
    const openCheckout=()=>{
        const options={
            key:import.meta.env.VITE_RAZORPAY_KEY,
            amount:10000,
            currency:"INR",
            name:"Finance Guru",
            description:"Test Payment",
            handler:function(response){
                console.log("Payment success",response);
                alert("payment successfull !");

            },
            theme:{
                color:"#3399cc"
            }
        };

        const rzp=new window.Razorpay(options);
        rzp.open();
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
            Pay ₹100
        </button>
    )
}