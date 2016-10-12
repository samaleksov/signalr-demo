import React from "react"
import { withRouter } from 'react-router'
import Animate from 'grommet/components/Animate';

//{ CounterId: "175c0449", Name: "Let's count together", Value: 0 }
class Counter  extends React.Component {
	state = {
		hub: null,
		value: 0,
		counter: null,
	}
	onIncrement = () => {
		this.state.counter.Value += window.parseInt(this.props.location.query.incrementsBy);
		$.ajax({
          method:'put',
          url: '//localhost:5000/api/Counters/' + this.state.counter.CounterId,
          data: JSON.stringify(this.state.counter),
          dataType: "json",
          contentType: "application/json; charset=utf-8"
      });
		this.setState({ ...this.state })
	}
	updateCounter = (counter) => {
		this.setState({ ...this.state, counter })
	}
	componentWillUnmount = () => {
		this.state.hub.off("updateCounter", this.updateCounter.bind(this));
	}
	loaded = (counter) => {
		const value = counter.Value;
		this.setState({ ...this.state, value, counter })
		$.connection.hub.start().done(() => {
			this.state.hub.server.joinGroup(counter.CounterId);
		})
	}
	loadData = () => {
		$.ajax({
          method:'get',
          url: '//localhost:5000/api/Counters/175c0449',
          data: JSON.stringify(this.state.counter),
          dataType: "json",
          contentType: "application/json; charset=utf-8"
      }).success(this.loaded);
	}
	componentDidMount = () => {
		const hub = $.connection.counters;
		const counter = this.state.counter;
		$.connection.hub.url = "//localhost:5000/signalr";
		this.state.hub = hub;
		this.state.hub.on("updateCounter", this.updateCounter.bind(this));
		this.loadData();
	}
	onDecrement = () => {
		this.state.counter.Value -= window.parseInt(this.props.location.query.incrementsBy);
		$.ajax({
					method:'put',
          url: '//localhost:5000/api/Counters/' + this.state.counter.CounterId,
          data: JSON.stringify(this.state.counter),
          dataType: "json",
          contentType: "application/json; charset=utf-8"
      });
		this.setState({  ...this.state })
	}
	render () {
			let counterBody = (<h1>Loading</h1>);
			if(!!this.state.counter)
			{
				counterBody = (
					<div>
						<h1 style={{color: "red"}}>{this.state.counter.Name}</h1>
						<h1>{this.state.counter.Value}</h1>
						<button onClick={this.onIncrement}>+ {this.props.location.query.incrementsBy}</button>
						<button onClick={this.onDecrement}>- {this.props.location.query.incrementsBy}</button>
					</div>
				)
			}
			return (<div>
				<Animate keep={true} enter={{"animation": "slide-left", "duration": 2000}} leave={{"animation": "slide-left", "duration": 1000}} visible={true}>
					<div>{ counterBody }</div>
				</Animate>

			</div>);
	}
}

export default withRouter(Counter) ;
