import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import 'font-awesome/css/font-awesome.min.css';

// ALways we use props in non functional while this.props in functional compo 
const Stars = (props) => {
	const numberOfStars = 1 + Math.floor(Math.random()*9);
/* 	let stars = [];
	for(let i=0; i<numberOfStars; i++){
		stars.push(<i key={i} className="fa fa-star fa-2x"></i>);
	} */

	return (
	  <div className="col-5">
		{_.range(numberOfStars).map(i =>
        	<i key={i} className="fa fa-star fa-2x"></i>
      	)}
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
     {props.selectedNumber.map((number, i) =>
      	<span key={i}> {number} </span>
      )}
    </div>
  );
};

const Numbers = (props) => {
	const numberClassName = (number) => {
		if(props.selectedNumber.indexOf(number) >=0 ){	//if its selected by the user
			return 'selected'
		}
	}
	return (
	  <div className="card text-center">
		<div>
		{Numbers.list.map((number, i) =>
        	<span key = {i} className = {numberClassName(number)}
							onClick={() => props.selectNumber(number)}
			> 
			{number}
			 </span>
        )}
		</div>
	  </div>
	);
  };
  Numbers.list = _.range(1, 10);

class Game extends React.Component {
	state = {
		selectedNumber: [3, 5],
	};
	selectNumber = (clickedNumber) => {
		this.setState( prevState => ({
			selectedNumber: prevState.selectedNumber.concat(clickedNumber)
		}));
	};
	render() {
  	return (
    	<div className="container-fluid text-center p-5">
			<h1 className="text-success pb-4">Play Nine</h1>
			<hr />
			<div className="row">
				<Stars />
				<Button />
				<Answer selectedNumber={this.state.selectedNumber}/>
			</div>
			<br />
				<Numbers selectedNumber = {this.state.selectedNumber}
						selectNumber = {this.selectNumber}	
				/>
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
