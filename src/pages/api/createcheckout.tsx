import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

export default async function checkout(req: NextApiRequest, res: NextApiResponse){

    if(req.method === "POST"){
        const headers = req.headers;
        if(headers["x-key"]){
            try {

                const key = headers["x-key"].toString().split("Bearer ")[1];
                if(key === process.env.STRIPE_API){

                    const body = req.body;
                    if(!body) return res.status(405).json({erro: "Body not found"});

                    const price = body.price_id as string;
                    const qnt = body.quantidade as number;
                    const expiresAt = Math.floor(Date.now() / 1000) + 1800; // 30 minutos em segundos

            
                    const stripe = new Stripe(process.env.STRIPE_SECRET as string);

                    const session = await stripe.checkout.sessions.create({
                        currency: "brl",
                        success_url: `${process.env.NEXT_PUBLIC_PATH+""}`,
                        line_items: [
                        {
                            price: price,
                            quantity: qnt,
                        },
                        ],
                        
                        mode: 'payment', //payment(pagamento único) - subscription(assinatura de preço fixo) - setup(salva os detalhes para cobrar mais tarde)
                        expires_at: expiresAt,
                        shipping_address_collection: { //para recuperar endereço
                            allowed_countries: ["BR"]
                        }
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