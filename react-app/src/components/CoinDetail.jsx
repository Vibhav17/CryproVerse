import React from 'react'
import  { useEffect, useState } from 'react'
import {Baseurl} from './Baseurl.js'
import Loader from './Loader.jsx'
import Header from './Header.jsx'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './coinDetail.css'
const CoinDetail = () => {
    const [coin,setCoin]=useState([])
    const [loading,setLoading]=useState(true)
    const {id}=useParams()
    useEffect(()=>{
        const getCoinData=async()=>{
            const {data}=await axios.get(`${Baseurl}/coins/${id}`)
            console.log(data);
            setLoading(false)
            setCoin(data)
        }
        getCoinData()
    },[])
  return (
    <div>CoinDetail</div>
  )
}

export default CoinDetail;