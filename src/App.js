import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import HighScores from './components/highScores/HighScores';
import Contact from './components/contact/Contact'
import { Route, Switch } from 'react-router';

class App extends React.Component {
  render() {

    return (
      <div className="App">
      Hello, this is app.js
      <Navbar/>
      <Switch>
      <Route path='/' component={Home}/>
      <Route path='/high-scores' component={HighScores}/>
      <Route path='/contact' component={Contact}/>
      </Switch>
      </div>
    );
  }
}

export default App;
