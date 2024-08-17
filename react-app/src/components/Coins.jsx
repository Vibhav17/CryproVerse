import React from 'react'
import  { useEffect, useState } from 'react'
import {Baseurl} from './Baseurl.js'
import Loader from './Loader.jsx'
import Header from './Header.jsx'

import axios from 'axios'
import   './Coins.css'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const Coins = () => {
    const [loading,setLoading]=useState(true);
    const [coins,setCoins]=useState([]);
    const [currency,setCurrency]=useState('inr')
    const [search,setSearch]=useState('')
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
            <div className='search-bar' style={{marginLeft :'40px'}}>
                <TextField id="outlined-basic" label="Coins" variant="outlined" type='text' placeholder='Search  Coin' style={{marginLeft :'50px',height :'2rem',width:'25rem',position:'absolute',top:'1%',left:'35%' ,paddingLeft :'5px'}} InputProps={{
                style: {
                    backgroundColor: 'white'
                }
            }} onChange={(e)=>setSearch(e.target.value)}></TextField>

            </div>
            <div className='btns'>
                <button onClick={()=>setCurrency('inr')} class="button-62" role="button">INR</button>
                
                <button onClick={()=>setCurrency('usd')} class="button-62" role="button">USD</button>
            </div>
            
                {
                    
                    coins.filter((data) => {
                         if (search === '') {
                                 return data;
                        } else if (data.name.toLowerCase().includes(search.toLowerCase())) {
                        return data;
                            }
                                })
                .map((item,idx)=>{
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