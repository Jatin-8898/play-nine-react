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
	let button;
	switch(props.answerIsCorrect){
		case true:
			button = <button className="btn btn-success" onClick={props.acceptAnswer}>
						<i className="fa fa-check"></i>
					</button>;
			break;

		case false:
			button = <button className="btn btn-danger">
						<i className="fa fa-times"></i>
					</button>;
			break;

		default:
			button  = 
				<button className="btn btn-primary" 
						onClick = {props.checkAnswer}
						disabled = {props.selectedNumbers.length === 0}>
						=
				</button>;
			break;	
	}
	return (
		<div className="col-2 pt-2">
			{button}
			<br /><br/>
			<button className="btn btn-warning btn-sm p-2" 
					onClick = {props.redraw}
					disabled ={props.redraws === 0}>
				<i className="fa fa-refresh"> </i>
				{props.redraws}
			</button>
		</div>
  );
};


const Answer = (props) => {
  return (
    <div className="col-5">
     {props.selectedNumbers.map((number, i) =>
      	<span key={i} onClick={ () => props.unselectNumber(number)}> {number} </span>
      )}
    </div>
  );
};

const Numbers = (props) => {
	const numberClassName = (number) => {
		if(props.usedNumbers.indexOf(number) >=0 ){	//if its already used in the list
			return 'used'
		}
		if(props.selectedNumbers.indexOf(number) >=0 ){	//if its selected by the user
			return 'selected'
		}
	}
	return (
	  <div className="card text-dark bg-dark ">
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

const DoneFrame = (props) => {
	return(
		<div>
			<h2 className="p-4 font-weight-bold">
				{props.doneStatus}
			</h2>
		</div>
	);
}  
class Game extends React.Component {
	static randomNumber = () => 1 + Math.floor(Math.random()*9);
	state = {
		selectedNumbers: [],
		randomNumberOfStars: Game.randomNumber(),
		usedNumbers: [],
		answerIsCorrect: null,
		redraws: 5,
		doneStatus: 'Game Over!',
	};
	selectNumber = (clickedNumber) => {
		/* Handling the condition where same no gets added in the answer compo */
		if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){//if it no already exists do nothing
			return;
		}
		this.setState( prevState => ({
			answerIsCorrect:null,
			selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
		}));
	};
	unselectNumber = (clickedNumber) => {
		/* This unselects the number by using filter ie if it matches it removes it from answer*/
		this.setState( prevState => ({
			answerIsCorrect:null,
			selectedNumbers: prevState.selectedNumbers
									 .filter(number => number !== clickedNumber)
		}))
	}
	checkAnswer = () => {
		this.setState( prevState =>  ({
			/* Since we want the accumulated result of the numOfStar to the selectedNumbers we use reduce */
			answerIsCorrect:prevState.randomNumberOfStars === prevState.selectedNumbers.reduce( (acc,n) => acc + n, 0)
		}));
	}
	acceptAnswer = () => {
		this.setState( prevState => ({
			/* Simply mark the no as used if its in selectedNumbers list  & re render UI*/
			usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
			answerIsCorrect: null,
			selectedNumbers: [],
			randomNumberOfStars: Game.randomNumber(),
		}));
	}
	redraw = () => {
		if(this.state.redraws === 0){
			return;
		}
		this.setState( prevState => ({
			randomNumberOfStars: Game.randomNumber(),
			answerIsCorrect: null,
			selectedNumbers: [],
			redraws: prevState.redraws - 1,
		}));
	}
	render() {
		/* Destructuring the elements */
		const { 
			selectedNumbers, 
			randomNumberOfStars, 
			answerIsCorrect, 
			usedNumbers,
			redraws,
			doneStatus
						} = this.state;
		return (
			<div className="container-fluid text-center p-5">
				<h1 className="text-success pb-4">Play Nine</h1>
				<hr />
				<div className="row">
					<Stars numberOfStars={randomNumberOfStars}/>

					<Button selectedNumbers = {selectedNumbers}
							redraws = {redraws}
							checkAnswer = {this.checkAnswer}
							answerIsCorrect = {answerIsCorrect}
							acceptAnswer = {this.acceptAnswer}
							redraw = {this.redraw}
					/>

					<Answer selectedNumbers={selectedNumbers}
							unselectNumber={this.unselectNumber}
					/>

				</div>
				<br />
					<Numbers selectedNumbers = {selectedNumbers}
							selectNumber = {this.selectNumber}	
							usedNumbers = {usedNumbers}
					/>

					<DoneFrame doneStatus={doneStatus}/>
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
