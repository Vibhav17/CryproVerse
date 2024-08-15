import React, { useEffect, useState } from 'react'
import Header from './Header';
import axios from 'axios'
import {Baseurl} from './Baseurl.js'
import Loader from './Loader.jsx'
import coin from '../coin.png'
import './Exchanges.css'
const Exchanges = () => {
    const [loading,setLoading]=useState(true);
    const [exchanges,setExchanges]=useState([]);
    useEffect(()=>{
        const getExchangesData=async()=>{
            const {data}=await axios.get(`${Baseurl}/exchanges`)
            console.log(data);
            setLoading(false)
            setExchanges(data)
        }
        getExchangesData()
    },[])
  return (
   <>
        {
            loading ? <Loader/> : <>
            <Header></Header>
            <div>
                {
                    exchanges.map((item,idx)=>{
                        return(
                            <div className='ex-cards'>
                    <div className='image'>
                        <img src={item.image} height={'80px'}></img>
                    </div>
                    <div className='name'>
                        {item.name}
                    </div>
                    <div className='price'>
                        {item.trade_volume_24h_btc.toFixed(0)}
                    </div>
                    <div className='rank'>
                        {item.trust_score_rank}
                    </div>
                </div>
                        )
                    })
                }
            </div>
            </>
        }
   </>
  )
}

export default Exchanges;