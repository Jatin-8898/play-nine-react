import React, { Component } from 'react';
import './App.css';

const Button = (props) => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  );
};

const Answer = (props) => {
  return (
    <div className="col-5">
      ...
    </div>
  );
};

const Numbers = (props) => {
	return (
	  <div className="card text-center">
		<div>
		  <span>1</span>
		  <span className="selected">2</span>
		  <span className="used">3</span>
		</div>
	  </div>
	);
  };

class Game extends React.Component {
	render() {
  	return (
    	<div>
      	<h3>Play Nine</h3>
        <Button/>
        <Answer/>
        <Number/>
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
