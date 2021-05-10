import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink as Link
} from "react-router-dom";
import Home from './views/Home';
import FoodDiary from './views/FoodDiary';
import Information from './views/Information';
import SymptomsLog from './views/SymptomsLog';

function App() {
  return (
    <Router>
      <nav>
        <div>Nom Nom</div>
        <ul id="menu">
          <li>
            <Link to="/" exact activeStyle={{color: 'red'}}>Home</Link>
          </li>
          <li>
            <Link to="/food-diary" activeStyle={{color: 'red'}}>Food Diary</Link>
          </li>
          <li>
            <Link to="/symptoms" activeStyle={{color: 'red'}}>Symptoms Log</Link>
          </li>
          <li>
            <Link to="/info" activeStyle={{color: 'red'}}>Information</Link>
          </li>            
        </ul>
      </nav>
      
      <Switch>
        <Route path="/info">
          <Information />
        </Route>
        <Route path="/symptoms">
          <SymptomsLog />
        </Route>
        <Route path="/food-diary">
          <FoodDiary />
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
