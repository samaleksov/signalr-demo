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
		showNotification: false,
		interval: null,
		notifications: 0,
	}
	carousel = null
	closeNotification = () => {
		this.setState({ showNotification: false })
	}
	startPoison () {
		const interval = setInterval(this.poisonTick, 600);
		this.setState({ ...this.state, interval });
	}
	poisonTick = () => {
		if(this.state.interval != null)
		{
			let notifications = this.state.notifications + 1;
			try {
				var audio = new Audio('/notification.mp3');
				audio.play();
			} catch (e) {

			} finally {

			}
			this.setState({ ...this.state, notifications });
		}
	}
	stopPoison () {
		clearInterval(this.state.interval)
		const notifications = 0;
		this.setState({ ...this.state, interval: null, notifications });
	}
	keyDown = (event) => {
		 if(event.keyCode == 27)
		 {
	  	event.preventDefault();
			 return false;
		 }
		 if(event.keyCode == 190 || event.keyCode == 78)
		 {
			 if(!this.state.showNotification)
			 {
					try {
						var audio = new Audio('/notification.mp3');
						audio.play();
					} catch (e) {

					} finally {

					}
			 }
			 this.setState({ showNotification: !this.state.showNotification });
			 event.preventDefault();
			 return false;
		 }
		 if(event.keyCode == 116 || event.keyCode == 77)
		 {

			 event.preventDefault();
			 if(this.state.interval != null)
			 {
				 this.stopPoison();
			 }
			 else
			 {
				 this.startPoison();
			 }
			 return false;
		 }
		 if(!!this.carousel)
		 {
			 if(event.keyCode == 34 || event.keyCode == 39)
			 {
				 this.carousel._slideNext();
				 event.preventDefault();
				 return false;
			 }
			 else if(event.keyCode == 33 || event.keyCode == 37)
			 {
				 this.carousel._slidePrev();
				 event.preventDefault();
				 return false;
			 }
		 }
 	}
  componentDidMount () {
    window.document.addEventListener("keydown", this.keyDown, false);
 	}
	componentWillUnmount () {
		window.document.removeEventListener("keydown", this.keyDown, false);
	}
	render () {
		let notification = null;
		let notifications = null;
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
			      <h2>Wow. Good luck with the demo! Such demo! Much awesome, so amaze.</h2>
			  </Section>
			</Layer>)
		}
		if(this.state.notifications !== 0)
		{
			notifications = Array.apply(null, {length: this.state.notifications}).map(Number.call, Number).map((number) => {
				return (
					(<div key={number}>
							<Header>
						    <Heading tag="h1">
						      Notification from Doge
						    </Heading>
						  </Header>
						  <Section>
						      <h2>Wow. Good luck with the demo! Such demo! Much awesome, so amaze.</h2>
						  </Section>
						</div>)
				)
			})
			notifications = (<Layer align="center" closer={ closer }> {notifications }</Layer>)
		}
		return (
			<Box full={true} primary={true}>
				{ notification }
				{ notifications }
				<Carousel ref={(c) => this.carousel = c} autoplay={false} persistentNav={false} >
					<Hero colorIndex="ok">
						<Box>
							<Image src="/sqlsat538_header.png" size="medium" fit="contain" alt="SQLSaturday" />
						</Box>
						<Box>
							<Image src="/techtalks.png" size="medium" fit="contain" alt="SQLSaturday" />
						</Box>
						<span style={{color: "White"}}>
							<h1>
								Sam Aleksov
							</h1>
							<h3>
								@samaleksov | sam@refractiondevelopment.com
							</h3>
						</span>
						<span style={{color: "White"}}>
							<h1>
								Petar Marinov
							</h1>
							<h3>
								petar_marinov@epam.com
							</h3>
						</span>
					</Hero>
					<Hero colorIndex="ok">
						<h1 style={{color: "White"}}>
							 #sqlsatSofia
						</h1>
						<h1 style={{color: "White"}}>
							 #sqlsat538
						</h1>
						<h1 style={{color: "White"}}>
							 #sqlpass
						</h1>
					</Hero>
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
					<Hero>
						<Box size="xsmall">
						</Box>
					</Hero>
					<Box align="center" alignSelf="center" size="xxlarge" colorIndex="light-1">
						<h1>
							The big picture
						</h1>
						<Image src="/what_is_signalr_invocation.png" size="large" fit="contain" alt="The big picture" />
					</Box>
					<Box align="center" alignSelf="center" size="xxlarge" colorIndex="light-1">
						<h1>
							In depth look
						</h1>
						<Image src="intro_architecture.png" size="large" fit="contain" alt="Architecture" />
					</Box>
					<Hero backgroundImage="/coffee.jpg">
						<h1>
							The code
						</h1>
					</Hero>
					<Hero backgroundImage="/iStock_82972681_web.jpg">
						<h1>
							Demo time
						</h1>
					</Hero>
					<Hero colorIndex="ok">
						<span style={{color: "White"}}>
							<h1>
								Thank you!
							</h1>
							<h1>
								<a style={{ color: "White"}} href="https://github.com/l337h4x0r/signalr-demo">https://github.com/l337h4x0r/signalr-demo</a>
							</h1>
						</span>
					</Hero>
				</Carousel>
			</Box>

		);
	}
}
export default withRouter(Slides);
