import React, { PropTypes } from 'react';
import GrommetApp from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Footer from 'grommet/components/Footer';
import TextInput from 'grommet/components/TextInput';
import { withRouter } from 'react-router'
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import CheckBox from 'grommet/components/CheckBox';
import { SIGNALR_URL } from '../constants'
import Image from 'grommet/components/Image';
import Notification from 'grommet/components/Notification';
import Button from 'grommet/components/Button';
import Close from 'grommet/components/icons/base/Close';
import moment from "moment"

class App extends React.Component {
  state = {
    hub: null,
    messageHub: null,
    sync: false,
    messages: []
  }
  goHome = () => {
    this.props.router.push('/');
    this.onNavigate('/');
  }
  syncChanged = (event) => {
    this.setState({ ...this.state, sync: !this.state.sync })
  }
  onNavigate = (target) => {
    if(!!this.state.hub)
      this.state.hub.server.navigate(target);
  }
  navigate = (target) => {
    if(this.state.sync)
      this.props.router.push(target);
  }
  sendMessage = (message) => {
    this.state.messageHub.server.sendMessage(message);
  }
  receiveMessage = (text) => {
    const message = { text, timestamp: new Date() }
    message.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    const messages = this.state.messages.concat(message);
    this.setState({ ...this.state, messages });
  }

  removeNotification = (notification) => {
    const messages = this.state.messages.filter(message => message.id !== notification.id);
    this.setState({ ...this.state, messages });
  }
  messageKeyDown = (event) => {
    if(event.keyCode === 13)
    {
      this.sendMessage(this.messageBox.value);
      this.messageBox.value = "";
    }
  }
  dummyFunction = () => {

  }
  componentDidMount = () => {
		const hub = $.connection.navigation;
    const counterHub = $.connection.counters;
    const stocksHub =$.connection.stock;
    const messageHub = $.connection.message;
    const dashHub = $.connection.dashboard;

    stocksHub.on("updateTickers", this.dummyFunction);
    counterHub.on("updateCounter", this.dummyFunction);
    dashHub.on("addStats", this.dummyFunction);
    messageHub.on("receiveMessage", this.receiveMessage);

    if(!!hub)
    {
      $.connection.hub.url = SIGNALR_URL;
  		this.state.hub = hub;
      $.connection.hub.start().done(() => {
        stocksHub.off("updateTickers", this.dummyFunction);
        counterHub.off("updateCounter", this.dummyFunction);
        dashHub.off("addStats", this.dummyFunction);
  		})
      this.setState({ ...this.state, hub, messageHub });
      this.state.hub.on("navigate", this.navigate);
    }
    this.messageBox.addEventListener("keydown", this.messageKeyDown, false);
    setInterval(this.updateMessages, 10000);
	}
	componentWillUnmount = () => {
    if(!!this.state.hub)
		  this.state.hub.off("navigate", this.navigate);
	}
  updateMessages = () => {
    const messages = this.state.messages.map(msg => msg);
    this.setState({ ...this.state, messages })
  }
  render () {

    const currentLocation = this.props.location.pathname;
    const headerAndFooter = (currentLocation.indexOf("slides") !== -1);

    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       onNavigate: this.onNavigate
     })
    );

    const notifications = this.state.messages.map((message) => {
      return (
        <Notification key={message.id} closer={<Button onClick={() => this.removeNotification(message)} icon={<Close />} />} status="ok" message={message.text + " | " + moment(message.timestamp).fromNow()}/>
      )
    });

    return (
      <GrommetApp inline={false} centered={!headerAndFooter}>
        <Box primary={true} full={true} pad="small">
          <Header size="large" justify="between" colorIndex="grey-2-a" pad={{"horizontal": "medium", "vertical" : "medium"}}>
            <a style={{color: "White"}} onClick={this.goHome}><Image src="/techtalks.png" size="small" fit="contain" alt="Tech Talks" /></a>
            <div style={{ visibility: !headerAndFooter ? "visible" : "hidden"}}>
              <CheckBox label="Sync" toggle={true} checked={this.state.sync} onChange={this.syncChanged} />
            </div>
          </Header>
          <Box flex="grow">
            {notifications}
            {childrenWithProps}
          </Box>
          <div style={{ visibility: !headerAndFooter ? "visible" : "hidden"}}>
            <Footer justify="between" colorIndex="grey-1" size="large" primary={true} pad={{"horizontal": "medium", "vertical" : "medium"}}>
              <Box alignContent="stretch" flex={true}>
                  <input ref={(c) => this.messageBox = c} id="message" name="message" type="text"  />
              </Box>
            </Footer>
          </div>
        </Box>
      </GrommetApp>
    )
  }
}
App.propTypes = {
  children: PropTypes.node
};

export default withRouter(App);
