import AuthProvider from './contexts/AuthContext'
import Login from './components/Login';
import Signup from './components/SignUp';
import Landing from './components/Landing';
import PrivateRoute from './components/PrivateRoute'
import Navigation from './components/Navigation';
import Slide from './components/Slide';
import DashBoard from './components/DashBoard';
import Patient from './components/Patient/Patient'
import Docs from './components/Docs'
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
          <Route path="/docs" component={Docs}/>
          {/* <PrivateRoute path="/slidesTable" component={SlidesTable}/> */}
          <PrivateRoute path="/dashboard" component={DashBoard}/>
          <PrivateRoute path="/patient/:patientID/slide/:slideID" component={Slide}/>
          <PrivateRoute path="/patient/:patientID" component={Patient}/>
          <Route path="*" exact={true}><h1 className="text-center">404 NOT FOUND</h1></Route>
        </Switch>
        
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
