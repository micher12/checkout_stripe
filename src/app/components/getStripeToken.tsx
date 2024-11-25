"use server";

export default async function getStripeToken(){
    return await process.env.STRIPE_API;
}