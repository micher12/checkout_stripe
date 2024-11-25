"use client";

import getStripeToken from "./components/getStripeToken";

export default function Home() {

  const checkout =  async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
    e.preventDefault();

    const token = await getStripeToken();

    const api = await fetch("api/checkout",{
      method: "POST",
      headers:{
        "Content-type":"application/json",
        "x-key":`Bearer ${token}`
      }
    });

    const status = api.status;
    const response = await api.json();

    console.log(response);

  }

  return (
      <main className="min-h-screen bg-slate-200 py-20">
        <div className="container">
            <div className="box">
              <h2 className="font-semibold text-xl">PRODUTOS</h2>
              <div className="content mt-2">
                <h2>Produto: Camiseta </h2>
                <h2>Descrição: Camiseta preta 100% algodão </h2>
                <h2>Preço: R$20,00</h2>
                <a onClick={checkout} className="bg-green-500 text-neutral-50 px-6 py-0.5 rounded mt-2 block w-fit font-semibold hover:bg-green-400 cursor-pointer transition scaleBtn">FINALIZAR</a>
              </div>
            </div>
        </div>
      </main>
  );
}
