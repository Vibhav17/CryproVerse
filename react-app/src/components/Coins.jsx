import React, { useEffect, useState } from 'react';
import { Baseurl } from './Baseurl.js';
import Loader from './Loader.jsx';
import Header from './Header.jsx';
import './Coins.css';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const Coins = () => {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [currency, setCurrency] = useState('inr');
    const [search, setSearch] = useState('');
    const [error, setError] = useState(null);
    const currencySymbol = currency === 'inr' ? '₹' : '$';

    const getCoinsData = async () => {
        try {
            const response = await fetch(`${Baseurl}/coins/markets?vs_currency=${currency}`);
            if (!response.ok) {
                throw new Error('Failed to fetch coin data');
            }
            const data = await response.json();
            setCoins(data);
            setError(null); // Reset error on successful fetch
        } catch (error) {
            console.error('Error fetching coin data:', error);
            setError('Failed to load coin data. Please try again later.'); // Set error message with more details
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCoinsData();
    }, [currency]);

    const handleRetry = () => {
        setLoading(true);
        getCoinsData(); // Retry fetching data
    };

    return (
        <>
            <Header />
            {loading ? (
                <Loader />
            ) : error ? (
                <div className="error-message" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>{error}</p>
                    <button onClick={handleRetry} className="button-62" role="button" style={{ marginTop: '20px' }}>
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    <div className='search-bar' style={{ marginLeft: '40px' }}>
                        <TextField
                            id="outlined-basic"
                            label="Coins"
                            variant="outlined"
                            type='text'
                            placeholder='Search Coin'
                            style={{ marginLeft: '50px', height: '2rem', width: '25rem', position: 'absolute', top: '1%', left: '35%', paddingLeft: '5px' }}
                            InputProps={{ style: { backgroundColor: 'white' } }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className='btns'>
                        <button onClick={() => setCurrency('inr')} className="button-62" role="button">
                            INR
                        </button>
                        <button onClick={() => setCurrency('usd')} className="button-62" role="button">
                            USD
                        </button>
                    </div>
                    <h1 style={{ textAlign: 'center', fontSize: '4rem', color: 'orange', marginTop: '2rem' }}>
                        Coins List
                    </h1>
                    <div>
                        {coins
                            .filter((data) => {
                                if (search === '') {
                                    return data;
                                } else if (data.name.toLowerCase().includes(search.toLowerCase())) {
                                    return data;
                                }
                                return false;
                            })
                            .map((item, idx) => {
                                const change = item.price_change_percentage_24h;

                                return (
                                    <Link to={`/coins/${item.id}`} key={idx} style={{ textDecoration: 'none', color: 'white' }}>
                                        <div className='ex-cards'>
                                            <div className='image'>
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className='name'>{item.name}</div>
                                            <div className='price'>
                                                {currencySymbol} {Number(item.current_price.toFixed(0)).toLocaleString('en-IN')}
                                            </div>
                                            <div className='rank' style={{ color: change > 0 ? 'green' : '#AA0000' }}>
                                                {change > 0 ? '+' : '-'} {Math.abs(change)} %
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>
                </>
            )}
        </>
    );
};

export default Coins;
