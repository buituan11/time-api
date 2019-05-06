import React, { Component } from 'react';
const zone = [ 'Timezone?', 'UTC', 'PST', 'MST'];

class TimeForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			reRender: 0,
			tzone: null
		}
	}

    handleChange = (obj) =>{
    	let options = obj.target.children;
    	for (var i = options.length - 1; i >= 0; i--) {
    		if ( options[i].selected )
    		{
    			// console.log(options[i].value);
    			if (options[i].value === 'Timezone?'){
    				this.setState({ tzone: null });	
    				return;
    			}
    			else{
    				this.setState({ tzone: options[i].value });
    				return;
    			}
    		}
    	}
    }
    inpRequest = ( string ) => {
    	let s = string;
    	let t = '', st=0, fn=s.length-1;
    	while ( s[ st ] === ' '){
    		st++;
    	}
    	while ( s[ fn ] === ' ' ){
    		fn--;
    	}
    	for (let i = st; i <= fn; i++) {
    		if ( (s[i] === ' ') && (s[i-1] !== ' ') ) {
    			t += '+';
    		}
    		else 
    		if ( s[i] !== ' ' ){
    			t += s[i];
    		}
    	}
    	return t;
    }
    newRequest = (_tzone, _option) => {
    	return { tzone: _tzone, msg: _option};
    }
    handleRequest = (_tzone, _option) => {
    	let s = this.inpRequest(_option);
    	if (!_tzone){
    		alert('Yeu cau chon mui gio');
    	}
    	if (!s){
    		alert('Yeu cau nhap lua chon');
    	}
    	this.props.update( this.newRequest(_tzone, s) );
    }
    render() {
    	let obj = null;
        return (
        	<form>
        		<select onChange={ (e) => this.handleChange(e) } >
        			{ zone.map( (t) => {
        				return <option key={t} value={t}> {t} </option>
        			} )}
        		</select>
        		<input 
        			type='text'
        			placeholder='A String'
        			ref={ (inp) => { obj = inp }}
        		/>
        		<button
        			type='button'
        			onClick={ () => this.handleRequest(this.state.tzone, obj.value)}> 
        			Update request </button>
        	</form>  
        );
    }
}

export default TimeForm;
