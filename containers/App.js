import React, { PropTypes } from 'react';
import GrommetApp from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Heading from 'grommet/components/Heading';
import Footer from 'grommet/components/Footer';
import { withRouter } from 'react-router'

class App extends React.Component {
  goHome = () => {
    this.props.router.push('/')
  }
  render () {
    return (
      <GrommetApp>
        <Article>
          <Heading>
            <a onClick={this.goHome}>SignalR Demo</a>
          </Heading>
          {this.props.children}
          <Footer>
            Footer
          </Footer>
        </Article>
      </GrommetApp>
    )
  }
}
App.propTypes = {
  children: PropTypes.node
};

export default withRouter(App);
