import axios from "axios";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Header1 from "@/components/Header1";

const Payment = () => {
  const router = useRouter();
  
  const makePayment = async () => {
    const val = {
      id: router.query?.id,
    };
    const { data } = await axios.post(`/api/razorpay`, val);

    const options = {
      key: process.env.RAZORPAY_KEY,
      name: "Vaibhav Pandey",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thank You stay!",
      handler: function (response) {},
      prefill: {
        name: "Vaibhav Pandey",
        email: "Vp9724522@gmail.com",
        contact: 987654321,
      },
    };

    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  useEffect(() => {
    makePayment();
  }, []);

  return (<>
  <Header1/>
    <div className="bg-[url('/banking.jpg')] h-screen bg-no-repeat bg-cover bg-center bg-fixed">
    

      <Script src="http://checkout.razorpay.com/v1/checkout.js" className="m-10 h-20"  />
    </div>
  </>

  );
};

export default Payment;