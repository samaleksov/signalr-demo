import React from "react"
import { withRouter } from 'react-router'
import Hero from 'grommet/components/Hero';
import Box from 'grommet/components/Box';
import Carousel from 'grommet/components/Carousel';
import Layer from 'grommet/components/Layer';
import Heading from 'grommet/components/Heading';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Pulse from 'grommet/components/icons/Pulse';
import Image from 'grommet/components/Image';
import Spinning from 'grommet/components/icons/Spinning';

class Slides  extends React.Component {
	state = {
		showNotification: false
	}
	carousel = null
	closeNotification = () => {
		this.setState({ showNotification: false })
	}
	keyDown (event) {
		 if(event.keyCode == 78)
		 {
			 this.setState({ showNotification: !this.state.showNotification })
		 }
		 if(!!this.carousel)
		 {
			 if(event.keyCode == 39)
			 {
				 this.carousel._slideNext();
			 }
			 else if(event.keyCode == 37)
			 {
				 this.carousel._slidePrev();
			 }
		 }
 	}
  componentWillMount () {
     window.document.addEventListener("keydown", this.keyDown.bind(this), false);
 	}
	render () {
		let notification = null;
		const closer = (<div style={{ margin: "10px"}} onClick={ this.closeNotification }><Pulse  icon={ <Image src="/profile_picture.jpg" size="small" fit="contain" alt="Doge" /> }/></div>)
		if(this.state.showNotification)
		{
			notification = (<Layer align="center" closer={ closer }>
				<Header>
			    <Heading tag="h1">
			      Notification from Doge
			    </Heading>
			  </Header>
			  <Section>
			    <Paragraph>
			      <h2>Wow. Good luck with the demo! Such demo! Much awesome, so amaze.</h2>
			    </Paragraph>
			  </Section>
			</Layer>)
		}
		return (
			<Box full={true} primary={true}>
				{ notification }
				<Carousel ref={(c) => this.carousel = c} autoplay={false} persistentNav={false} >
					<Hero backgroundImage="/iStock_000065756809_Large_2.jpg">
						<h1>
							Crafting killer real time apps with SignalR and SQL Server
						</h1>
					</Hero>
					<Hero backgroundImage="/iStock_90898237_web.jpg" colorIndex="neutral-2">
						<Box size="xsmall">
							<h1 style={{backgroundColor: "Black", textAlign: "center"}}>
								Phone!
							</h1>
						</Box>
					</Hero>
					<Hero backgroundImage="/iStock_000009322434_Full.jpg" colorIndex="neutral-2">
						<Box size="xsmall">
							<h1 style={{backgroundColor: "Black", textAlign: "center"}}>
								Doctors!
							</h1>
						</Box>
					</Hero>
					<Hero colorIndex="neutral-1">
						<Box size="medium">
								<h1>Don't waste my <Spinning /></h1>
						</Box>
					</Hero>
					<Hero backgroundImage="/the_internet.jpg" colorIndex="neutral-2">
						<Box size="xsmall">
							<h1 style={{backgroundColor: "Black", textAlign: "center"}}>
								THE INTERNET
							</h1>
						</Box>
					</Hero>
					<Hero backgroundImage="/iStock_82972681_web.jpg">
						<h1>
							Demo time
						</h1>
					</Hero>
				</Carousel>
			</Box>

		);
	}
}
export default withRouter(Slides);
