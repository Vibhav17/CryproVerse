import './App.css';
import { Routes, Route } from 'react-router-dom';
import Exchanges from './components/Exchanges.jsx';
import CoinDetail from './components/CoinDetail.jsx';
import Coins from './components/Coins.jsx';

function App() {
  return (
    <Routes>
    <Route path='/' element={<Exchanges />} />
    <Route path='/coins' element={<Coins />} />
    <Route path='/coindetail/:id' element={<CoinDetail />} />
  </Routes>
  );
}

export default App;
