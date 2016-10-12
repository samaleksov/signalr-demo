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

class App extends React.Component {
  goHome = () => {
    this.props.router.push('/')
  }
  render () {
    return (
      <GrommetApp inline={true}>
        <Box primary={true} full={true} pad="small">
          <Header size="large" justify="between" colorIndex="grey-2-a" pad={{"horizontal": "medium", "vertical" : "medium"}}>
            <Title>
               <a style={{color: "White"}} onClick={this.goHome}>SignalR Demo</a>
            </Title>
          </Header>
          <Box flex="grow">
          {this.props.children}
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
