import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookAppointment from './components/BookAppointment';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/book-appointment" component={BookAppointment} />
      </Switch>
    </div>
  );
}

export default App;

