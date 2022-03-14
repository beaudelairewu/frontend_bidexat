import AuthProvider from './contexts/AuthContext'
import Login from './components/Login';
import Signup from './components/SignUp';
import Landing from './components/Landing';
import PrivateRoute from './components/PrivateRoute'
import Navigation from './components/Navigation';
import SlidesTable from './components/SlidesTable';
import Slide from './components/Slide';
import DashBoard from './components/DashBoard';
import Patient from './components/Patient'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Navigation/>
        <Switch>
          {/* <PrivateRoute path="/detection" exact component={Detection}/> */}
          <Route path="/" exact component={Landing}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          {/* <PrivateRoute path="/slidesTable" component={SlidesTable}/> */}
          <PrivateRoute path="/slide" component={Slide}/>
          <PrivateRoute path="/dashboard" component={DashBoard}/>
          <PrivateRoute path="/patient" component={Patient}/>
        </Switch>
        
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
