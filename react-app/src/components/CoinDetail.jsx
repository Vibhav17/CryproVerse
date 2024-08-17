import React from 'react'
import { useEffect,useState } from 'react'
import { Baseurl } from './Baseurl'
import Loader from './Loader'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import coinimg from '../coin.png'
import './CoinDetail.css'
import {BiSolidUpArrow,BiSolidDownArrow} from "react-icons/bi"
import {IoPulseOutline} from 'react-icons/io5'
const CoinDetail = () => {
  const [coin,setCoin]=useState([])
  const [loading,setLoading]=useState(true)
  const {id}=useParams();
  const profit=coin.market_data?.price_change_percentage_24h >0;
  const [currency,setCurrency]=useState('inr')
  useEffect(()=>{
    const getCoin=async()=>{
        const {data}=await axios.get(`${Baseurl}/coins/${id}`)
        console.log(data);
        setCoin(data);
        setLoading(false);
    }
    getCoin();
  },[id])
  return (
    <>
      {
        loading ? <Loader></Loader> :<>
        
          <div className='coin-detail'>
            <div className='coin-info'>
            <div className='btns'>
                <button onClick={()=>setCurrency('inr')} class="button-62" role="button">INR</button>
                
                <button onClick={()=>setCurrency('usd')} class="button-62" role="button">USD</button>
            </div>
              <div className='time'>
                {
                  coin.last_updated
                }
              </div>
              <div className='coin-image'>
                <img src={coin.image.large} height={'150px'}></img>
              </div>
              <div className='coin-name'>{coin.name}</div>
            <div className='coin-price'>{coin.market_data.current_price[{currency}]}</div>
            <div className='coin-profit'>
            {profit ? <BiSolidUpArrow color='green'></BiSolidUpArrow> : <BiSolidDownArrow color='red'></BiSolidDownArrow>}{coin.market_data?.price_change_percentage_24h}%
            </div>
            <div className='market-rank'><IoPulseOutline color='orange'/>#{coin.market_cap_rank} market cap rank</div>
            <div className='coin-desc'><p>{coin.description['en'].split('.')[0]}</p></div>
            </div>
            
          </div>

        </>
      }
    </>
  )
}

export default CoinDetail