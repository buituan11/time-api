import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';
import TimeForm from '../TimeForm/TimeForm';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      Time: null,
      tzone: 'UTC',
      msg: 'now',
    }
  } 
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.Time !== nextState.Time ||
           this.state.tzone !== nextState.tzone ||
           this.state.msg !== nextState;
  }
  fetchTime = () => {
    let api = 'https://andthetimeis.com' + '/'+ this.state.tzone + '/' + this.state.msg + '.json';
    console.log( api );
    fetch( api )
    .then( resp => resp.json() )
    .then( data => {
        const Time = data.dateString;
        this.setState({ Time: Time });
    })
  }
  changeUpdate = ( newUpdate ) => {
    console.log(newUpdate.tzone);
    if ( newUpdate.tzone && newUpdate.msg){
      this.setState({ tzone: newUpdate.tzone, msg: newUpdate.msg});
      this.fetchTime();
    }
  }
  showTime = () => {
    return ( 
      <div>
        <p> { this.state.Time } </p>
        <TimeForm
          update = { (newUpdate) => this.changeUpdate( newUpdate) }
        />
      </div> 
    );
  }

  render() {
    let Time = this.state.Time;
    return( 
      <div className="App">
        <h1>Time API</h1> 
        { !Time && <button onClick={ () => this.fetchTime() }> Current Time in UTC </button> }
        { Time && this.showTime() }
      </div>
    );
  };
}

export default App;
