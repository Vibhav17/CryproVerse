import './App.css';
import { Routes, Route } from 'react-router-dom';
import Exchanges from './components/Exchanges.jsx';
import CoinDetail from './components/CoinDetail.jsx';
import Coins from './components/Coins.jsx';
import OurModel from './components/OurModel.jsx';

function App() {
  return (
    <Routes>
    <Route path='/' element={<OurModel />} />
    <Route path='/exchanges' element={<Exchanges />} />
    <Route path='/coins' element={<Coins />} />
    <Route path='/coins/:id' element={<CoinDetail />} />
  </Routes>
  );
}

export default App;
