import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';

const Stars = (props) => {
	return (
	  <div className="col-5">
		<i className="fa fa-star fa-2x"></i>
		<i className="fa fa-star fa-2x"></i>
		<i className="fa fa-star fa-2x"></i>
		<i className="fa fa-star fa-2x"></i>
	  </div>
	);
};

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
    	<div className="container-fluid text-center">
			<h1 className="text-success">Play Nine</h1>
			<hr />
			<div className="row">
				<Stars />
				<Button />
				<Answer />
			</div>
			<br />
				<Numbers />
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
