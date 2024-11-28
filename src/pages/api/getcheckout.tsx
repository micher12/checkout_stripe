import { NextApiRequest, NextApiResponse } from "next";


export default async function getcheckout(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === "POST"){
        //recuperar o checkout
    }

    return res.status(405).json({erro: "Inválido!"})

}