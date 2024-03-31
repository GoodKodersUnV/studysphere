"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

import Script from 'next/script';

const Premium = ({secret}) => {
    const [tokens, setTokens] = useState(5);
    let totalAmt = tokens * 5;
    let amtWithDis = totalAmt - (tokens - 1) * 2;
    const name = "kalyan";
    const email = "kalyantingani@gmail.com";
    const [currency, setCurrency] = useState('INR');

    const createOrderId = async (amount : number) => {
        try {
            const response = await fetch('/api/razorpay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: amount * 100,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.orderId;
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };
    const processPayment = async (e: React.FormEvent<HTMLFormElement> ,tokens:number , amount : number) => {
        e.preventDefault();
        try {
            const orderId: string = await createOrderId(amount);
            const options = {
                key: process.env.key_id,
                amount: amount * 100,
                currency: currency,
                name: 'name',
                description: 'description',
                order_id: orderId,
                handler: async function (response: any) {
                    const data = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        tokens ,
                        amount
                    };

                    const result = await fetch('/api/verify', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const res = await result.json();
                    if (res.isOk) alert("payment succeed");
                    else {
                        alert(res.message);
                    }
                },
                prefill: {
                    name: name,
                    email: email,
                },
                theme: {
                    color: '#FEEBC8',
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.on('payment.failed', function (response: any) {
                alert(response.error.description);
            });
            paymentObject.open();
        } catch (error) {
            console.log(error);
        }
    };
    const handleBasic = (e) => {
        processPayment(e,tokens,(tokens * 5 - (tokens - 1) * 2) );
    }
    const handleBulk = (e) => {
        processPayment(e ,20, 50);
    }
    const handlePremium = (e) => {
        processPayment(e, parseInt(secret), 200 );
    }

    const handleTokenChange = (e) => {
        const value = parseInt(e.target.value);
        if (value < 1) {
            setTokens(1);
        } else if (value >=10000) {
            setTokens(10000);
        } else {
            setTokens(value);
        }
    }
    

    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <div className="flex gap-8 items-center m-8 mt-12">
                <div className="w-1/3 rounded-lg flex flex-col justify-between border border-blue-600 h-[550px] bg-orange-50 p-5">
                    <div className="flex gap-2 items-center">
                        <Image src="/basic.png" alt="coin" width={40} height={40} />
                        <h1 className="text-2xl font-bold">Basic</h1>
                    </div>
                    <div className="flex gap-2 items-center">
                        <h1>Get a </h1>
                        <Image src="/coin.png" alt="coin" width={30} height={30} />
                        <h1 className="flex items-center">for &nbsp; <FaRupeeSign />5 each</h1>
                    </div>
                    <div className="text-md font-semibold">
                        <h1>Daily 3 tokens are additionally allocated</h1>
                        <h1>Custom quiz generation</h1>
                        <h1>Token purchase option</h1>
                        <h1>.</h1>
                        <h1>.</h1>
                    </div>
                    <div>
                        <input type="number" value={tokens} min={1} max={1000} className="outline-none block m-auto rounded-xl w-20 text-center text-md px-4 py-2" onChange={handleTokenChange} />
                    </div>
                    <div className="flex justify-center items-end gap-4">
                        {tokens>0 &&
                            <div className="flex line-through items-center text-md">
                                <FaRupeeSign />
                                <h1>{totalAmt}</h1>
                            </div>
                        }
                        {tokens>0 &&
                            <div className="flex items-center text-4xl text-blue-600 font-bold">
                                <FaRupeeSign />
                                <h1>{amtWithDis}</h1>
                            </div>
                        }
                    </div>
                    <div>
                        <button onClick={handleBasic} className="w-full hover:font-semibold hover:bg-gradient-to-r from-yellow-200 to-orange-300 border border-black rounded text-center p-4">Proceed to Buy</button>
                    </div>
                </div>
                <div className="w-[40%] rounded-lg border border-blue-600 flex flex-col justify-between h-[600px] bg-orange-50 p-5">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <Image src="/advanced.png" alt="coin" width={40} height={40} />
                            <h1 className="text-2xl font-bold">Advanced</h1>
                        </div>
                        <div className="flex items-center px-2 py-1 gap-2 rounded border border-black">
                            <Image src="/popular.png" alt="coin" width={20} height={10} />
                            <h1 className="">Most Popular</h1>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-md font-semibold">
                            <h1>Bulk token purchase</h1>
                            <h1>Custom quiz generation</h1>
                            <h1>.</h1>
                            <h1>.</h1>
                            <h1>.</h1>
                        </div>
                        <div className="">
                            <Image src="/coins.png" alt="coins" width={140} height={140} />
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <div className="flex gap-2 items-end">
                            <h1 className="flex items-center text-4xl text-blue-600 font-bold">20</h1>
                            <h1 className="font-semibold text-xl">coins</h1>
                        </div>
                        <div className="flex gap-2 items-end">
                            <h1 className="flex items-center text-4xl text-blue-600 font-bold">50</h1>
                            <h1 className="font-semibold text-xl">Rupees</h1>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleBulk} className="hover:font-semibold hover:bg-gradient-to-r from-yellow-200 to-orange-300 w-full border border-black rounded text-center p-4">Proceed to Buy</button>
                    </div>
                </div>
                <div className="w-1/3 rounded-lg border flex flex-col border-blue-600 justify-between h-[550px] bg-orange-50 p-5">
                    <div className="flex gap-2 items-center">
                        <Image src="/premium.png" alt="coin" width={40} height={40} />
                        <h1 className="text-2xl font-bold">Premium</h1>
                    </div>
                    <div className="text-md font-semibold">
                        <h1>Unlimited quiz generation</h1>
                        <h1>No token limits</h1>
                        <h1>Value for money</h1>
                        <h1>.</h1>
                        <h1>.</h1>
                    </div>
                    <div className="flex items-end justify-center">
                        <div className="flex items-center text-4xl text-blue-600 font-bold">
                            <FaRupeeSign />
                            <h1>200</h1>
                        </div>
                        <h1 className="font-semibold text-xl">/monthly</h1>
                    </div>
                    <div>
                        <button onClick={handlePremium} className="hover:font-semibold hover:bg-gradient-to-r from-yellow-200 to-orange-300 w-full border border-black rounded text-center p-4">Proceed to Buy</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Premium;
