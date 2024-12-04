import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cointable from './components/Cointable';
import Cart from './components/Cartpage';
import Coinmodel from './components/Coinmodel';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Cointable />} />
          <Route path="/" element={<Coinmodel />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;