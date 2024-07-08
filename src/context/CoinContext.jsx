import { createContext, useEffect, useState } from "react";


export const CoinContext = createContext();

const CoinContextProvider = (props)=>{
     const [allCoin , setAllCoin] =useState([]);
     const [currency,setCurrency] = useState({
        name: "usd",
        symbol :"$"
     })

     //first we make account on coinGecko , then generate an api key , then we click on try button , and paste the key in the header portion , then we get this code jisko bas paste krdiya idhr lmao.

     const fetchAllCoin = async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Z4u7TUTjmQvcCvEohb6nRtrq'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
     }

     useEffect(()=>{
     fetchAllCoin();
     },[currency])
 
     //currency is passed above because whenevr the currency gets updated it recalls the fetching func.
     
    const contentValue ={
    allCoin,currency,setCurrency
    }
    return (
        <CoinContext.Provider value={contentValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;