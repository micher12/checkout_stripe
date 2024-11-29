import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";

export default async function updateproduto(req: NextApiRequest, res: NextApiResponse){
    
    if(req.method === "POST"){
        const headers = req.headers;
        if(headers["x-key"]){
            try {
                const key = headers["x-key"].toString().split("Bearer ")[1];
                if(key === process.env.STRIPE_API){

                    const body = req.body;
                    /* body example
                    {
                        "product_id": "prod_RIrAJUB5RNdfO5",
                        "nome": "Camiseta Vingadores",
                        "preco": 6000,
                        "metadata": {
                            "Cor": "preta",
                            "comprimento": 36,
                            "largura": 30,
                            "peso": 50
                        },
                        "descricao": "Camiseta preta dos vingadores"
                    }
                    */
                    if(!body) return res.status(405).json({erro: "Body not found"});

                    const product_id = body.product_id;
                    const name = body.nome as string;
                    const preco = body.preco as number;
                    const metadata: Stripe.MetadataParam = body.metadata;
                    const description = body.descricao as string;

                    const stripe = new Stripe(process.env.STRIPE_SECRET as string);

                    await stripe.products.update(
                        product_id,
                        {
                            active: false,
                        }
                    );

                    const senderJson = {
                        nome: name,
                        preco: preco,
                        metadata: metadata,
                        descricao: description
                    }

                    const api = await fetch(`${process.env.NEXT_PUBLIC_PATH}/api/createproduto`,{
                        method: "POST",
                        body: JSON.stringify(senderJson),
                        headers:{
                            "Content-type":"application/json",
                            "x-key":`Bearer ${process.env.STRIPE_API}`
                        }
                    })

                    const status = api.status;
                    const response = await api.json();

                    if(status === 200){
                        if(response.sucesso === "ok")
                            return res.status(200).json({sucesso: "ok", product: response.product})
                    }

                    return res.status(404).json({erro: "Algo deu errado"})

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