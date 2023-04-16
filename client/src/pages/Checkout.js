import React from "react";
import axios from "axios";

const Checkout = () => {
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  //   const initPayment = (data) => {
  //     const options = {
  //       key: "YOUR_RAZORPAY_KEY",
  //       amount: data.amount,
  //       currency: data.currency,
  //       name: "nitesh S",
  //       description: "Test Transaction",
  //       order_id: data.id,
  //       handler: async (response) => {
  //         try {
  //           const verifyUrl = "http://localhost:8080/api/payment/verify";
  //           const { data } = await axios.post(verifyUrl, response);
  //           console.log(data);
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       },
  //     };
  //     const rzp1 = new window.Razorpay(options);
  //     rzp1.open();
  //   };

  //   const handlePayment = async () => {
  //     try {
  //       const res = await loadScript(
  //         "https://checkout.razorpay.com/v1/checkout.js"
  //       );

  //       if (!res) {
  //         alert("Razorpay SDK failed to load. Are you online?");
  //         return;
  //       }

  //       const orderUrl = "http://localhost:8080/api/payment/orders";
  //       const { data } = await axios.post(orderUrl, { amount: 2000 });
  //       console.log(data);
  //       initPayment(data.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      "http://localhost:8080/api/payment/orders",
      { amount: 2799 }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    console.log("result.data", result.data.data);
    const { amount, id: order_id, currency } = result.data.data;

    const options = {
      key: "rzp_test_AgwP7BCvtP0uGq", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Myntra Clone",
      description: "Test Transaction",
      order_id: order_id,
      prefill: {
        name: "Myntra Clone",
        email: "myntraClone@example.com",
        contact: "9999999999",
      },
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:8080/api/payment/verify",
          data
        );

        // alert(result.data.msg);
      },
      notes: {
        address: "Myntra Clone payments office Dummy",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Buy React now!</p>
        <button className="App-link" onClick={displayRazorpay}>
          Pay ₹500
        </button>
      </header>
    </div>
  );
};

export default Checkout;
