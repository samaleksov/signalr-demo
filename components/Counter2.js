import React from "react"
import { withRouter } from 'react-router'

class Counter  extends React.Component {
	state = {
		value: 1,
	}
	onIncrement = () => {
		const value = this.state.value + 2;
		this.setState({value})
	}
	componentDidMount = () => {
		setTimeout(()=> document.title = "Client component 2", 1000);
	}
	onDecrement = () => {
		const value = this.state.value - 2;
		this.setState({ value })
	}
	goToCounter1 = () => {
		this.props.router.push('/')
	}
	render () {
		return (<div>
			<h1 style={{color: "purple"}}>Counter 2</h1>
		  <h1>{this.state.value}</h1>
			<button onClick={this.onIncrement}>+</button>
			<button onClick={this.onDecrement}>-</button>
			<button onClick={this.goToCounter1}>Go to Counter 1</button>
		</div>);
	}
}

export default withRouter(Counter);
