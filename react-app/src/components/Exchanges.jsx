import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Baseurl } from './Baseurl.js';
import Loader from './Loader.jsx';
import './Exchanges.css';

const Exchanges = () => {
    const [loading, setLoading] = useState(true);
    const [exchanges, setExchanges] = useState([]);
    const [error, setError] = useState(null); // Added error state

    const getExchangesData = async () => {
        setLoading(true); // Set loading to true before making the API call
        try {
            const response = await fetch(`${Baseurl}/exchanges`);
            if (!response.ok) {
                throw new Error('Failed to fetch exchanges data');
            }
            const data = await response.json();
            setExchanges(data);
            setError(null); // Reset error on successful fetch
        } catch (error) {
            console.error('Error fetching exchanges data:', error);
            setError('Failed to load exchanges data.'); // Set error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getExchangesData(); // Fetch data on component mount
    }, []);

    return (
        <>
            <Header />
            {loading ? (
                <Loader />
            ) : error ? (
                <div className="error-message" style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p>{error}</p>
                    <button onClick={getExchangesData} className="button-62" role="button" style={{ marginTop: '20px' }}>
                        Retry
                    </button>
                </div>
            ) : (
                <>
                    <h1 style={{ marginLeft: '20rem', marginTop: '3rem', marginBottom: '3rem', fontSize: '4rem', color: 'orange' }}>
                        Crypto Exchanges
                    </h1>
                    <div className="ex-cards header">
                        <div className="image" style={{ fontSize: '26px', color: 'black' }}>Exchanges</div>
                        <div className="name" style={{ fontSize: '26px', color: 'black' }}>Name</div>
                        <div className="price" style={{ fontSize: '26px', color: 'black' }}>Trade Vol</div>
                        <div className="rank" style={{ fontSize: '26px', color: 'black' }}>Trust Rank</div>
                    </div>
                    <div>
                        {exchanges.map((item, idx) => (
                            <div key={idx} className="ex-cards">
                                <div className="image">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="name">{item.name}</div>
                                <div className="price">{item.trade_volume_24h_btc.toFixed(0)}</div>
                                <div className="rank">{item.trust_score_rank}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default Exchanges;
