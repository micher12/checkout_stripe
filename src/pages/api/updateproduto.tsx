import { NextApiRequest, NextApiResponse } from "next";
import {Stripe} from "stripe";

export default async function updateproduto(req: NextApiRequest, res: NextApiResponse){
    
    if(req.method === "POST"){
        const headers = req.headers;
        if(headers["x-key"]){
            try {
                const key = headers["x-key"].toString().split("Bearer ")[1];
                if(key === process.env.STRIPE_API){

                    const body = req.body;
                    if(!body) return res.status(405).json({erro: "Body not found"});

                    const name = body.nome as string;
                    const preco = body.preco as number;
                    const metadata: Stripe.MetadataParam  = body.metadata;
                    const description = body.descricao as string;

                    const stripe = new Stripe(process.env.STRIPE_SECRET as string);

                    const price = await stripe.prices.create({
                        currency: 'brl',
                        unit_amount: preco, // 200 = R$ 2
                        product_data: {
                          name: name,
                          active: true,
                          metadata: metadata,
                          statement_descriptor: description, //max 22 char
                        },
                        
                    });

                    return res.status(200).json({sucesso: "ok", price_id: price.id})
                }

                return res.status(401).json({erro:"Inválido"});

            } catch (error) {
                console.log(error);
                return res.status(401).json({erro:"Inválido"});
            }
        }

        return res.status(401).json({erro:"Inválido"})

    }

    return res.status(405).json({erro:"Inválido"})

}