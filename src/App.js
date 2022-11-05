import './App.css';
import Layout from './Layout/Layout';
import Header from './Components/Header';
import ResultPage from './Components/ResultPage';
import { BrowserRouter ,Routes,Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' exact element={ <Layout />} />
          <Route path='/resultpage' element={ <ResultPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
