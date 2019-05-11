import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';
import TimeForm from '../TimeForm/TimeForm';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: false,
      time: ''
    }
  } 
  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.Time !== nextState.Time ||
  //          this.state.tzone !== nextState.tzone ||
  //          this.state.msg !== nextState;
  // }
  fetchTime = (tzone, msg) => {
    let api = 'https://andthetimeis.com' + '/'+ tzone + '/' + msg + '.json';
    console.log( api );
    fetch( api )
    .then( resp => resp.json() )
    .then( data => {
        const Time = data.dateString;
        this.setState({ time: Time });
    })
  }
  initTime = () =>{
    this.setState({ current: true });
    this.fetchTime('UTC', 'now');
  }
  changeUpdate = ( newUpdate ) => {
    // console.log( this.state.time );
    if ( newUpdate.tzone && newUpdate.msg){
      this.setState({ time: this.fetchTime(newUpdate.tzone, newUpdate.msg) });
    }
  }
  showTime = () => {
    return ( 
      <div>
        <p> { this.state.time } </p>
        <TimeForm
          update = { (newUpdate) => this.changeUpdate( newUpdate) }
        />
      </div>            
    );
  }

  render() {
    return( 
      <div className="App">
        <h1>Time API</h1> 
        { !this.state.current && <button onClick={ () => { this.initTime() } }> Current Time in UTC </button> }
        { this.state.current && this.showTime() }
        <ul>
          <li> /utc/now → Current UTC time </li>
          <li> /pdt/in+two+hours → Time two hours from now in PDT </li>
          <li> /pdt/next+monday → Datetime for next Monday in PDT </li>
          <li> /pdt/this+friday+at+noon → Datetime for this Friday at noon in PDT ("friday noon" works too) </li>
          <li> /pdt/7+hours+before+tomorrow+at+noon → I think you get the point </li>
        </ul>
      </div>
    );
  };
}

export default App;
