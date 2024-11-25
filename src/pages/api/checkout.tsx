import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

export default async function checkout(req: NextApiRequest, res: NextApiResponse){

    if(req.method === "POST"){
        const headers = req.headers;
        if(headers["x-key"]){
            try {

                const key = headers["x-key"].toString().split("Bearer ")[1];
                if(key === process.env.STRIPE_API){
                    const stripe = new Stripe(process.env.STRIPE_SECRET as string);

                    // const price = await stripe.prices.create({
                    //     currency: 'brl',
                    //     unit_amount: 1000,
                    //     product_data: {
                    //       name: 'Gold Plan',
                    //       active: true,
                    //       metadata: {
                    //         "Cor": "azul"
                    //       },
                    //       statement_descriptor: "Camiseta preta", //max 22 char
                    //     },
                       
                    // });

                    //criar api so para cadastro de "produtos/preço"

                    //criar api so para verificar id's de checkouts

                    const session = await stripe.checkout.sessions.create({
                        currency: "brl",
                        success_url: `http://localhost:3000/`,
                        line_items: [
                          {
                            price: "price_1QPAhGHLlhy3kNEIF3izcmBU",
                            quantity: 2,
                          },
                        ],
                        //payment(pagamento único) - subscription(assinatura de preço fixo) - setup(salva os detalhes para cobrar mais tarde)
                        mode: 'payment', 
                    });

                    return res.status(200).json({sucesso: "ok", id: session.id})

                }

                return res.status(401).json({erro:"Inválido!"});

            } catch (error) {
                return res.status(401).json({erro:"Inválido! - "+error});
            }

        }

        return res.status(401).json({erro:"Inválido!"});

    }else{
        return res.status(405).json({erro:"Inválido!"});
    }

}