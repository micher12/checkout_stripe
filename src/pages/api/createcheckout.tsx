import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

export default async function checkout(req: NextApiRequest, res: NextApiResponse){

    if(req.method === "POST"){
        const headers = req.headers;
        if(headers["x-key"]){
            try {

                const body = req.body;
                const price = body.price_id as string;
                const qnt = body.quantidade as number;

                const key = headers["x-key"].toString().split("Bearer ")[1];
                if(key === process.env.STRIPE_API){
                    const stripe = new Stripe(process.env.STRIPE_SECRET as string);

                    const session = await stripe.checkout.sessions.create({
                        currency: "brl",
                        success_url: `${process.env.PATH as string}`,
                        line_items: [
                          {
                            price: price,
                            quantity: qnt,
                          },
                        ],
                        //payment(pagamento único) - subscription(assinatura de preço fixo) - setup(salva os detalhes para cobrar mais tarde)
                        mode: 'payment', 
                    });

                    return res.status(200).json({sucesso: "ok", checkout: session})

                }

                return res.status(401).json({erro:"Inválido!"});

            } catch (error) {
                console.log(error)
                return res.status(401).json({erro:"Inválido!"});
            }

        }

        return res.status(401).json({erro:"Inválido!"});

    }

    return res.status(405).json({erro:"Inválido!"});
    
}