import Dashboard from './components/dashboard/Dashboard.jsx';
import Login from './components/login/Login.jsx';
import Thankyou from './components/Thankyou/Thankyou.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route exact path="/"> */}
          {/* <Login /> */}
          {/* </Route> */}
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/thankyou">
            <Thankyou />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
