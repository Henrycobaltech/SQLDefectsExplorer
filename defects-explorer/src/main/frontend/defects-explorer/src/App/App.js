import React, { Component } from 'react';
import { CssBaseline, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@material-ui/core';
import './App.css';

const drawerWidth = 350;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pullRequests: [],
      selectedPr: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/pull-requests")
      .then(res => res.json())
      .then(prs => this.setState({ pullRequests: prs }));
  }

  selectPr(pr) {
    return () => this.setState({
      selectedPr: pr
    });
  }

  mainContent() {
    if (this.state.selectedPr) {
      return (
        <div>{this.state.selectedPr.title}</div>
      );
    } else {
      return <div>Select a PR on the left</div>;
    }
  }

  render() {
    return (
      <div className="app-root">
        <CssBaseline />
        <Drawer
          variant="permanent"
          anchor="left">
          <List>
            {
              this.state.pullRequests.map(pr =>
                <ListItem button key={pr.id} onClick={this.selectPr(pr)}>
                  <ListItemText primary={pr.title} secondary={pr.repoName} />
                </ListItem>
              )
            }
          </List>
        </Drawer>
        <main>
          {this.mainContent()}
        </main>
      </div>
    );
  }
}

export default App;
