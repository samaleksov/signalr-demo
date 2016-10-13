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

class App extends React.Component {
  state = {
    hub: null,
    sync: false
  }
  goHome = () => {
    this.props.router.push('/');
    this.onNavigate('/');
  }
  syncChanged = (event) => {
    this.setState({ ...this.state, sync: !this.state.sync })
  }
  onNavigate = (target) => {
    this.state.hub.server.navigate(target);
    console.log("navigating server");
  }
  navigate = (target) => {
    if(this.state.sync)
      this.props.router.push(target);
  }
  componentDidMount = () => {
    console.log('mounting')
		const hub = $.connection.navigation;
		$.connection.hub.url = SIGNALR_URL;
		this.state.hub = hub;
    $.connection.hub.start();
    this.setState({ ...this.state, hub });
    this.state.hub.on("navigate", this.navigate.bind(this));
	}
	componentWillUnmount = () => {
    console.log("component will unmount");
		this.state.hub.off("navigate", this.navigate.bind(this));
	}
  render () {
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       onNavigate: this.onNavigate
     })
    );
    return (
      <GrommetApp inline={true}>
        <Box primary={true} full={true} pad="small">
          <Header size="large" justify="between" colorIndex="grey-2-a" pad={{"horizontal": "medium", "vertical" : "medium"}}>
            <Title>
               <a style={{color: "White"}} onClick={this.goHome}>SignalR Demo</a>
            </Title>
            <CheckBox label="Sync" toggle={true} checked={this.state.sync} onChange={this.syncChanged} />
          </Header>
          <Box flex="grow">
          {childrenWithProps}
          </Box>
          <Footer justify="between" colorIndex="brand" size="large" primary={true} pad={{"horizontal": "medium", "vertical" : "medium"}}>
            <Box alignContent="stretch" flex={true}>
                <input name="sendText" type="text" />
            </Box>
          </Footer>
        </Box>
      </GrommetApp>
    )
  }
}
App.propTypes = {
  children: PropTypes.node
};

export default withRouter(App);
