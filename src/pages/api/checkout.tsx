import { NextApiRequest, NextApiResponse } from "next";

export default function checkout(req: NextApiRequest, res: NextApiResponse){

    if(req.method === "POST"){
        const headers = req.headers;
        if(headers["x-key"]){
            try {

                const key = headers["x-key"].toString().split("Bearer ")[1];
                if(key === process.env.STRIPE_API){

                    

                }

                return res.status(401).json({erro:"Inválido!"});

            } catch (error) {
                return res.status(401).json({erro:"Inválido!"});
            }

        }

        return res.status(401).json({erro:"Inválido!"});

    }else{
        return res.status(405).json({erro:"Inválido!"});
    }

}