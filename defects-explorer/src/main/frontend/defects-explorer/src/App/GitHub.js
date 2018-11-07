import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import './GitHub.css';



class GitHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pullRequests: [],
      selectedPr: null
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/pull-requests?page_idx=0&page_size=10")
      .then(res => res.json())
      .then(prs => this.setState({ pullRequests: prs }));

  }

  selectPr(pr) {
      return () => {
          this.setState({
              selectedPr: pr
          }, function () {
              this.props.setValue(pr, "GitHub");
          });
      }
  }


  render() {

    return (
      <div className="app-root">
          <List>
            {
              this.state.pullRequests.map(pr =>
                <ListItem button key={pr.id} onClick={this.selectPr(pr)}>
                  <ListItemText primary={pr.title} secondary={pr.repoName} />
                </ListItem>
              )
            }
          </List>
      </div>
    );
  }
}

export default GitHub;
