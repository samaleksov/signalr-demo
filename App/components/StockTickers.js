import React from "react"
import { withRouter } from 'react-router'
import moment from "moment"
import Animate from 'grommet/components/Animate';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Down from 'grommet/components/icons/base/Down';
import Up from 'grommet/components/icons/base/Up';
import { API_URL, SIGNALR_URL } from '../constants'

class StockTickers  extends React.Component {
	state = {
		hub: null,
		tickers: []
	}

	sorter(a,b) {
		if (a.Company < b.Company)
			return -1;
		if (a.Company > b.Company)
			return 1;
		return 0;
	}

	updateTickers = (tickers) => {
		let merge = [];
		for(var i in this.state.tickers){
		   var shared = false;
		   for (var j in tickers)
		       if (tickers[j].Symbol == this.state.tickers[i].Symbol) {
		           shared = true;
		           break;
		       }
		   if(!shared) merge.push(this.state.tickers[i])
		}
		merge = merge.concat(tickers).sort(this.sorter);

		this.setState({ ...this.state, tickers: merge });
	}
	componentWillUnmount = () => {
		this.state.hub.off("updateTickers", this.updateTickers.bind(this));
	}
	loaded = (tickers) => {
		$.connection.hub.start();
		this.setState({ ...this.state, tickers: tickers.sort(this.sorter), loaded: true });
	}
	loadData = () => {
		$.ajax({
          method:'get',
          url: API_URL + '/api/StockTickers/',
          dataType: "json",
          contentType: "application/json; charset=utf-8"
      }).success(this.loaded);
	}
	componentDidMount = () => {
		const hub = $.connection.stock;
		$.connection.hub.url = SIGNALR_URL;
		this.state.hub = hub;
		this.state.hub.on("updateTickers", this.updateTickers.bind(this));
		this.loadData();
	}
	render () {
			let counterBody = (<h1>Loading</h1>);
			if(!!this.state.loaded)
			{
				counterBody = (
					<div>
						<h1 style={{color: "red"}}>Stock Tickers</h1>
						<Table>
						  <thead>
						    <tr>
						      <th>Ticker</th>
						      <th>Name</th>
									<th>Price</th>
									<th>Updated</th>
						    </tr>
						  </thead>
						  <tbody>
								{
									this.state.tickers.map((ticker) => {

										return (
											<TableRow className={ ticker.Price > ticker.OldPrice ? "ticker-up" : "ticker-down" } key={ticker.Symbol}>
									      <td>{ticker.Symbol}</td>
									      <td>{ticker.Company}</td>
												<td>{"$ " + ticker.Price.toFixed(2)}</td>
												<td>{moment(ticker.LastUpdated).fromNow()}</td>
									    </TableRow>
										)
									})
								}
						  </tbody>
						</Table>
						<div className="left-to-right">
						{
							this.state.tickers.map((ticker) => {
								const icon = ticker.Price > ticker.OldPrice ? (<Up colorIndex="ok"/>) : (<Down colorIndex="critical"/>);
								return (
									<span key={ticker.Symbol}> {icon} {(ticker.Price - ticker.OldPrice).toFixed(2)} {ticker.Symbol} - {ticker.Company} </span>
								)
							})
						}
						</div>
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

export default withRouter(StockTickers) ;
