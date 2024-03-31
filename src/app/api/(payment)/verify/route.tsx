import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import updateTokens from '@/actions/updateTokens';

const generatedSignature = (
 razorpayOrderId: string,
 razorpayPaymentId: string
) => {
 const keySecret = process.env.RAZORPAY_SECRET_KEY;
 if (!keySecret) {
  throw new Error(
   'Razorpay key secret is not defined in environment variables.'
  );
 }
 const sig = crypto
  .createHmac('sha256', keySecret)
  .update(razorpayOrderId + '|' + razorpayPaymentId)
  .digest('hex');
 return sig;
};


export async function POST(request: NextRequest) {
 const { orderCreationId, razorpayPaymentId, razorpaySignature ,tokens, amount } =
  await request.json();

 const signature = generatedSignature(orderCreationId, razorpayPaymentId);
 if (signature !== razorpaySignature) {
  return NextResponse.json(
   { message: 'payment verification failed', isOk: false },
   { status: 400 }
  );
 } else{
     const updatedUser = await updateTokens(tokens)
     return NextResponse.json(
      { message: 'payment verified successfully', isOk: true, tokens : updatedUser.tokens},
      { status: 200 }
     );
 }

}
