import React from "react"
import { withRouter } from 'react-router'

class Counter  extends React.Component {
	state = {
		hub: null,
		value: 0,
		counter: { CounterId: "175c0449", Name: "Let's count together", Value: 0 }
	}
	onIncrement = () => {
		const value = this.state.value + 1;
		const state = this.state;
		this.state.counter.Value = value;
		$.ajax({
          method:'put',
          url: '//localhost:5000/api/Counters/' + this.state.counter.CounterId,
          data: JSON.stringify(this.state.counter),
          dataType: "json",
          contentType: "application/json; charset=utf-8"
      });
		this.setState({ ...state, value  })
	}
	updateCounter = (counter) => {
		console.log("Updating our counter");
		console.log(counter);
		const value = counter.Value;
		const state = this.state;
		this.setState({ ...state, value, counter })
	}
	componentDidMount = () => {
		const hub = $.connection.counters;
		const counter = this.state.counter;
		$.connection.hub.url = "//localhost:5000/signalr";
		this.state.hub = hub;

		$.connection.hub.start().done(() => {
			hub.server.joinGroup(counter.CounterId);
			console.log('SignalR Hub Started!');
		})
		this.state.hub.client.updateCouter = this.updateCounter.bind(this);
	}
	componentWillMount = () => {

	}
	onDecrement = () => {
		const value = this.state.value - 1;
		this.state.counter.Value = value;
		$.ajax({
					method:'put',
          url: '//localhost:5000/api/Counters/' + this.state.counter.CounterId,
          data: JSON.stringify(this.state.counter),
          dataType: "json",
          contentType: "application/json; charset=utf-8"
      });
		this.setState({  ...this.state, value })
	}
	goToCounter2 = () => {
		this.props.router.push('/counter2')
	}
	render () {
		return (<div>
			<h1 style={{color: "red"}}>Counter 1</h1>
		  <h1>{this.state.value}</h1>
			<button onClick={this.onIncrement}>+</button>
			<button onClick={this.onDecrement}>-</button>
			<button onClick={this.goToCounter2}>Go to Counter 2</button>
		</div>);
	}
}

export default withRouter(Counter) ;
