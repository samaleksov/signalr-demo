import React from "react"
import { withRouter } from 'react-router'
import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Paragraph from 'grommet/components/Paragraph';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import MarkerLabel from 'grommet/components/chart/MarkerLabel';
import Base from 'grommet/components/chart/Base';
import Layers from 'grommet/components/chart/Layers';
import Axis from 'grommet/components/chart/Axis';
import Marker from 'grommet/components/chart/Marker';
import Area from 'grommet/components/chart/Area';
import Line from 'grommet/components/chart/Line';
import Grid from 'grommet/components/chart/Grid';
import HotSpots from 'grommet/components/chart/HotSpots';
import Chart from 'grommet/components/chart/Chart';
import Value from 'grommet/components/Value';
import Label from 'grommet/components/Label';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Legend from 'grommet/components/Legend';

class Dashboard  extends React.Component {
	state = {
		hub: null,
		samples: [],
		stats: { timestamp: new Date(), cpu: 0, cpu1: 0, cpu2: 0, availableMem: 0, appCpu: 0, appMem: 0, mem: 0  }
	}
	addStats = (stats) => {
		const samples = this.state.samples.concat(stats);
		this.setState({ ...this.state, stats, samples })
	}
	componentDidMount = () => {
		const hub = $.connection.dashboard;
		hub.on("addStats", this.addStats);
		this.setState({ ...this.state, hub })
	}
	componentWillUnmount = () => {
		this.state.hub.off("addStats", this.addStats);
	}
	render () {
		const usedMemory = this.state.stats.mem - this.state.stats.availableMem;
		const availablePercent = this.state.stats.mem > 0 ? (this.state.stats.availableMem / this.state.stats.mem) * 100 : 0;
		const usedPercent = this.state.stats.mem > 0 ? (usedMemory / this.state.stats.mem) * 100 : 0;
		const appPercent = this.state.stats.mem > 0 ? (this.state.stats.appMem / this.state.stats.mem) * 100 : 0;
		return (
			<Box>
				<Heading>
					<Headline>
						<span>Dashboard</span>
					</Headline>
				</Heading>
				<Tiles>
				  <Tile>
						<Box>
							<h3>
								<span>available Memory</span>
							</h3>
							<Box size="small">
							  <Meter type="circle" value={availablePercent} label={<Value value={this.state.stats.availableMem} units="MB" />} />
							  <Box direction="row" justify="center" pad={{"between": "small"}} responsive={false}>
							    <Label size="small">
							      0 MB
							    </Label>
							    <Label size="small">
							      {this.state.stats.mem} MB
							    </Label>
							  </Box>
							</Box>
						</Box>
				  </Tile>
				  <Tile>
						<Box>
							<h3>
								<span>used memory</span>
							</h3>
							<Box size="small">
							  <Meter type="circle" value={usedPercent} threshold={ 90 } label={<Value value={usedMemory} units="MB" />} />
							  <Box direction="row" justify="center" pad={{"between": "small"}} responsive={false}>
							    <Label size="small">
							      0 MB
							    </Label>
							    <Label size="small">
							      {this.state.stats.mem} MB
							    </Label>
							  </Box>
							</Box>
						</Box>
					</Tile>
					<Tile>
						<Box>
							<h3>
								<span>memory used by demo</span>
							</h3>
							<Box size="small" direction="row" pad={{"between": "small"}} responsive={false}>
							  <Meter type="arc" vertical={true} value={parseInt(appPercent)} label={false} threshold={90} />
							  <Box justify="between" align="start" responsive={false}>
							    <Label size="small">
							      {this.state.stats.mem} MB
							    </Label>
							    <Value value={parseInt(this.state.stats.appMem)} units="MB" align="start" />
							    <Label size="small">
							      0 MB
							    </Label>
							  </Box>
							</Box>
						</Box>
					</Tile>
					<Tile>
						<Box>
							<h3>
								<span>performance</span>
							</h3>
							<Chart vertical={false}>
							  <Axis vertical={true} ticks={true} count={5} labels={[{"index": 2, "label": "50"}, {"index": 4, "label": "100"}]} />
							  <Chart vertical={true}>
							    <Base height="large" width="large" />
							    <Layers>
							      <Grid rows={3} columns={5} />
							      <Marker colorIndex="critical" value={90} />
							      <Area values={ this.state.samples.map((sample) => sample.cpu) } colorIndex="graph-1" />
							      <Line values={ this.state.samples.map((sample) => sample.cpu1) } colorIndex="accent-1" points={true} />
										<Line values={ this.state.samples.map((sample) => sample.cpu2) } colorIndex="accent-2" points={true} />
							      <HotSpots count={12} activeIndex={11} />
							    </Layers>
							  </Chart>
							  <MarkerLabel vertical={true} colorIndex="critical" label="90%" value={90} />
							</Chart>
							<Legend series={[
							  {"label": "Total CPU", "colorIndex": "graph-1" },
							  {"label": "CPU 1", "colorIndex": "accent-1"},
							  {"label": "CPU 2", "colorIndex": "accent-2"}
							]} />
						</Box>
					</Tile>
				</Tiles>
			</Box>
		);
	}
}
export default withRouter(Dashboard);
