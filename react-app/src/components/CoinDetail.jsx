import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import coinImage from '../coin.png';
import './coinDetail.css';
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import CoinChart from './CoinChart';
import Header from './Header';
import Loader from './Loader';

const Baseurl = 'https://api.coingecko.com/api/v3'; // Ensure this is set correctly

const CoinDetails = () => {
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [currency, setCurrency] = useState('inr');
  const currencySymbol = currency === 'inr' ? '₹' : '$';
  const profit = coin.market_data?.price_change_percentage_24h > 0;

  useEffect(() => {
    const getCoin = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state
        const { data } = await axios.get(`${Baseurl}/coins/${id}`);
        setCoin(data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setError('Failed to fetch coin data.');
      } finally {
        setLoading(false); // End loading
      }
    };
    getCoin();
  }, [id]);

  return (
    <>
      {loading ? <Loader /> : error ? (
        <div className='error-message'>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <Header />
          <div className='coin-detail'>
            <div className='coin-info'>
              <div className='btn'>
                <button onClick={() => setCurrency('inr')}>INR</button>
                <button onClick={() => setCurrency('usd')}>USD</button>
              </div>
              <div className="time">
                Last Updated: {new Date(coin.last_updated).toLocaleString()}
              </div>
              <div className="coin-image">
                <img height={"170px"} src={coin.image?.large || coinImage} alt={coin.name} />
              </div>
              <div className="coin-name">
                {coin.name}
              </div>
              <div className="coin-price">
                {currencySymbol} {coin.market_data?.current_price[currency]?.toLocaleString()}
              </div>
              <div className="coin-profit">
                {profit ? <BiSolidUpArrow color='green' /> : <BiSolidDownArrow color='red' />}
                {coin.market_data?.price_change_percentage_24h} %
              </div>
              <div className='market-rank'>
                <IoPulseOutline color='orange' />
                #{coin.market_cap_rank}
              </div>
              <div className='coin-desc'>
                <p>{coin.description?.en?.split('.')[0]}</p>
              </div>
            </div>
            <CoinChart currency={currency} />
          </div>
        </>
      )}
    </>
  );
}

export default CoinDetails;
