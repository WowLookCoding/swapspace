// importing google font for NextJS
import { getJSONData } from '@/tools/Toolkit';
import { useState, useEffect, ElementRef } from "react";
import { Note, Order, Orders, Topping } from "@/tools/orders.model";
import { data } from 'autoprefixer';
import { Griffy } from 'next/font/google';
const griffy = Griffy({weight: "400", subsets: ['latin']});

import LoadingOverlay from "../components/LoadingOverlay";

export default function Home() {
  // retrieve server sided script
  const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/retrieveOrder.php";

  // ------------------------------------------------------------ Event Handlers

  const onResponse = (data:Orders) => {
    setOrderData(data.orders);
    // Removes the load screen.
    setShowLoadscreen(false);
  }
  
  const onError = (message:string) => {
    console.log(`*** Error retrieving pizza order data :[ | ${message}`);
  }
  
  const getOrders = (e:any) => {
    // Shows the load screen.
    setShowLoadscreen(true);
    // Fetches the data from the API.
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }
  
  // ------------------------------------------------------------ State Variables
  
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(true);
  const [showLoadscreen, setShowLoadscreen] = useState<boolean>(false);
  
  // ------------------------------------------------------------ Use Effects

  // Next:
  // - Get the icons
  // - Publish to Vercel, whatever that is.


  // ------------------------------------------------------------ Rendering to DOM

  return (
    <main className="grid grid-rows-1 grid-cols-1 gap-0 text-content">

      <LoadingOverlay 
        spinnerColor="#FFFFFF" 
        bgColor="#b82308" 
        showSpinner={showSpinner} 
        enabled={showLoadscreen} />

      <div className="flex flex-nowrap items-center justify-center 
          bg-accent bg-[url('./../lib/images/background.jpg')] bg-no-repeat bg-center bg-cover
          border-solid border-b-4 border-accent min-h-[220px] p-5 text-white">

        <header className="grow text-center md:text-left">
          <div className={`${griffy.className} text-6xl`}>Antonio's Online Pizzaria</div>
          <div className="text-sm">If it's not Antonio's, it's rubbish!</div>
        </header>

        <div className="shrink-0 hidden md:block">
          <i className="fab fa-facebook-square fa-2x ml-1"></i>
          <i className="fab fa-twitter-square fa-2x ml-1"></i>
          <i className="fab fa-instagram fa-2x ml-1"></i>
        </div>
      </div>

      <aside className="flex flex-nowrap items-center justify-between p-5 flex-col md:flex-row">
        <div className="mb-5 md:hidden text-center">
          <>1234 Cheesy Drive | Tastyville, NS | 902-123-4567</>
        </div>
        <div>
          <div className="text-accent text-3xl font-bold mb-2.5">Welcome loyal pizza dispatcher....</div>Click the &quot;Get Orders&quot; button below to view all current orders that need to be delivered.
          <div>
              <button 
                className="bg-accent border-none rounded-md p-2.5 text-white hover:bg-greyContent mt-5" onClick={getOrders}>Get Orders</button>
          </div>
        </div>
        <div className="shrink-0 text-lg text-right text-greyContent hidden md:block">
          <div>Antonio's Pizzaria</div>
          <div>1234 Cheesy Drive</div>
          <div>Tastyville, NS</div>
          <div>902-123-4567</div>
        </div>
      </aside>

      <div className="bg-greyAccent p-10">

        <div id="output">

          {(orderData[0]) ?  
            <div className="divide-dashed divide-y-2 divide-accent">
              {orderData.map(
                (orderList:Order, i:number) => 
                  <div key={i} className="py-4">
                    <header className="text-accent text-2xl font-bold mb-2.5">Order #{orderList.id}:</header>

                    <div className="font-bold"><i className="fas fa-info-circle mr-1"></i>Customer Information</div> 
                    {orderList.name}<br/>
                    {orderList.address}<br/>
                    {orderList.city}<br/>

                    <div className="font-bold"><i className="fas fa-pizza-slice mr-1"></i>Pizza Slice</div> 
                    {orderList.size}<br/>

                    <div className="font-bold"><i className="fas fa-list-ul mr-1"></i>Order Details</div> 
                    {orderList.toppings.map(
                      (t:Topping) => 
                        <>{t.topping}<br/></>
                    )}

                    <div className="font-bold"><i className="fas fa-sticky-note mr-1"></i>Order Notes</div> 
                    {orderList.notes.map(
                      (n:Note) => 
                        <>{n.note}<br/></>
                    )}
                  </div>
              )}
            </div>
          : <>No orders retrieved...</>}
        </div>
      </div>
    </main>
  );
}