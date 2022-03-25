import ReactDOM from 'react-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home/Home';
import RmdNavBar from './components/RmdNavBar';
import Create from './pages/Create/Create';

ReactDOM.render(
  
  <BrowserRouter>
    <Routes>  
      <Route path="/" element={<FrontPage />} />
      <Route path="/explore" element={<Home />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
