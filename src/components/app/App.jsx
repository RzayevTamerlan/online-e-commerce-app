import {BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import Shop from "./../pages/Shop";
import NavBar from './../NavBar/NavBar';
import Basket from '../pages/Basket'
import DevicePage from "./../pages/DevicePage"

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Shop />}></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route path='/devices/:deviceId' element={<DevicePage />}></Route>
        <Route path='*' element={<Shop/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
