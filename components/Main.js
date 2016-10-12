import React from "react"
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import { withRouter } from 'react-router'

class Main  extends React.Component {
	state = {
		tiles: [
			{
				id: 1,
				title: "Social Counter",
				description: "social counter description",
				color: "neutral-2",
				link: "/counter1"
			}
		]
	}
	onSelect = (selected) => {
		const tile = this.state.tiles[selected];
		this.props.router.push(tile.link)
	}
	render () {
		return (
			<Tiles fill={true} selectable={true} selected={0} onSelect={this.onSelect}>
				{
					this.state.tiles.map((tile) => {
						return (
						<Tile key={tile.id} align="start" basis="small" flex={false} colorIndex={tile.color}>
					    <Header size="small" pad={{"horizontal": "small"}}>
					      <Heading tag="h4">
					        <strong>
					          {tile.title}
					        </strong>
					      </Heading>
					    </Header>
					    <Box pad="small">
					      <p>
					        {tile.description}
					      </p>
					    </Box>
					  </Tile>
					)
					})
				}
			</Tiles>
		);
	}
}
export default withRouter(Main);
