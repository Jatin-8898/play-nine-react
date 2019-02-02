import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import 'font-awesome/css/font-awesome.min.css';

// ALways we use props in non functional while this.props in functional compo 
const Stars = (props) => {
	
/* 	let stars = [];
	for(let i=0; i<numberOfStars; i++){
		stars.push(<i key={i} className="fa fa-star fa-2x"></i>);
	} */

	return (
	  <div className="col-5">
		{_.range(props.numberOfStars).map(i =>
        	<i key={i} className="fa fa-star fa-2x"></i>
      	)}
	  </div>
	);
};

const Button = (props) => {
  return (
    <div className="col-2">
      <button className="btn btn-primary" disabled={props.selectedNumber.length === 0}>=</button>
    </div>
  );
};


const Answer = (props) => {
  return (
    <div className="col-5">
     {props.selectedNumber.map((number, i) =>
      	<span key={i} onClick={ () => props.unselectNumber(number)}> {number} </span>
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
		selectedNumber: [],
		randomNumberOfStars: 1 + Math.floor(Math.random()*9),
		answerIsCorrect: null,
	};
	selectNumber = (clickedNumber) => {
		/* Handling the condition where same no gets added in the answer compo */
		if(this.state.selectedNumber.indexOf(clickedNumber)>=0){//if it no already exists do nothing
			return;
		}
		this.setState( prevState => ({
			selectedNumber: prevState.selectedNumber.concat(clickedNumber)
		}));
	};
	unselectNumber = (clickedNumber) => {
		/* This unselects the number by using filter ie if it matches it removes it from answer*/
		this.setState( prevState => ({
			selectedNumber: prevState.selectedNumber
									 .filter(number => number !== clickedNumber)
		}))
	}
	checkAnswer = () => {
		this.setState( prevState =>  ({
			/* Since we want the accumulated result of the numOfStar to the selectedNumber we use reduce */
			answerIsCorrect:prevState.randomNumberOfStars === prevState.selectedNumber.reduce( (acc,n) => acc + n, 0)
		}));
	}
	render() {
		/* Destructuring the elements */
		const { selectedNumber, randomNumberOfStars, answerIsCorrect} = this.state;
		return (
			<div className="container-fluid text-center p-5">
				<h1 className="text-success pb-4">Play Nine</h1>
				<hr />
				<div className="row">
					<Stars numberOfStars={randomNumberOfStars}/>
					<Button selectedNumber={selectedNumber}
							checkAnswer={this.checkAnswer}
							answerIsCorrect={answerIsCorrect}
					/>
					<Answer selectedNumber={selectedNumber}
							unselectNumber={this.unselectNumber}
					/>
				</div>
				<br />
					<Numbers selectedNumber = {selectedNumber}
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
