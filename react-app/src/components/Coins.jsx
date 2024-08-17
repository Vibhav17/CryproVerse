import React from 'react'
import  { useEffect, useState } from 'react'
import {Baseurl} from './Baseurl.js'
import Loader from './Loader.jsx'
import Header from './Header.jsx'

import axios from 'axios'
import   './Coins.css'
import { Link } from 'react-router-dom'
const Coins = () => {
    const [loading,setLoading]=useState(true);
    const [coins,setCoins]=useState([]);
    const [currency,setCurrency]=useState('inr')
    const currencySymbol = currency === 'inr' ? '₹':'$' 
    useEffect(()=>{
        const getCoinsData=async()=>{
            const {data}=await axios.get(`${Baseurl}/coins/markets?vs_currency=${currency}`)
            console.log(data);
            setLoading(false)
            setCoins(data)
        }
        getCoinsData()
    },[currency])
  return (
    <>
        {
            loading ? <Loader/> : <>
            <Header></Header>
            <div className='btns'>
                <button onClick={()=>setCurrency('inr')} class="button-62" role="button">INR</button>
                
                <button onClick={()=>setCurrency('usd')} class="button-62" role="button">USD</button>
            </div>
            
                {
                    
                    coins.map((item,idx)=>{
                        let change=(item.price_change_percentage_24h);
                        let sign='+';
        
                        return(
                            <Link to={`/coins/${item.id}`} style={{textDecoration :'none',color:'white'}}>
                            <div key={idx} className='ex-cards'>
                    <div className='image'>
                        <img src={item.image} height={'80px'}></img>
                    </div>
                    <div className='name'>
                        {item.name}
                    </div>
                    <div className='price'>
                     {currencySymbol}   { Number(item.current_price.toFixed(0)).toLocaleString('en-IN')   }
                    </div>
                    <div className='rank' style={(change>0)? {color : 'green'} :{color : '#AA0000'} }>
                       {change>0 ? '+': '-'} {Math.abs(change)} %
                    </div>
                </div>
                </Link>
                        )
                    })
                }
            
            </>
        }
   </>
  )
}

export default Coins