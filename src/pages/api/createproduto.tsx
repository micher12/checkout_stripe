"use server";

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function createproduto(req: NextApiRequest, res: NextApiResponse){

    if(req.method === "POST"){
        const headers = req.headers;
        if(headers["x-key"]){
            try {
                const key = headers["x-key"].toString().split("Bearer ")[1];
                if(key === process.env.STRIPE_API){

                    const body = req.body;
                    /* body example:
                    {
                        "nome": "Camiseta de anime",
                        "preco": 200,
                        "metadata": {
                            "Cor": "azul",
                            "comprimento": 22,
                            "largura": 10,
                            "peso": 300
                        },
                        "descricao": "Camiseta azul de anime"
                    }
                    */

                    if(!body) return res.status(405).json({erro: "Body not found"});

                    const name = body.nome as string;
                    const preco = body.preco as number;
                    const metadata: Stripe.MetadataParam = body.metadata;
                    const description = body.descricao as string;

                    const stripe = new Stripe(process.env.STRIPE_SECRET as string);

                    const product = await stripe.products.create({
                        name: name,
                        description: description,
                        metadata: metadata,
                        default_price_data: {
                            currency: "brl",
                            unit_amount: preco
                        },
                        images: ["https://code12.vercel.app/icon.png"] //listas de imagens
                      });

                    return res.status(200).json({sucesso: "ok", product: product})
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