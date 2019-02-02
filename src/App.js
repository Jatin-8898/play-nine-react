import React, { Component } from 'react';
import './App.css';

const Button = (props) => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  );
};

class Game extends React.Component {
	render() {
  	return (
    	<div>
      	<h3>Play Nine</h3>
        <Button/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
     <div>
       <Game />
     </div> 
    );
  }
}

export default App;
