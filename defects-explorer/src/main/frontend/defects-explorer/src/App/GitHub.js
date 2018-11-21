import React, { Component } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import './GitHub.css';
import StarIcon from '@material-ui/icons/Star';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const isDebug = true;

const apiHost = isDebug?"http://localhost:8080":"";

class GitHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pullRequests: [],
      selectedPr: null
    };
  }

  componentDidMount() {
      var page = this.props.pagevalue

      fetch(`${apiHost}/api/pull-requests?page_idx=${page}&&page_size=50`)
        .then(res => res.json())
        .then(prs => {this.setState({ pullRequests: prs.content });this.props.setPage(prs.content,prs.totalPages)});

  }

  selectPr(pr,index) {
      return () => {
          this.setState({
              selectedPr: pr
          }, function () {
              this.props.setValue(pr, "GitHub",index);
          });
      }
  }
    select(pr){
        if(pr["categories"].length>0){
            return(
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>)
        }
    }

  render() {

    return (
      <div className="app-root">
          <List>
            {
              this.state.pullRequests.map((pr,index) =>
                <ListItem button key={pr.id} onClick={this.selectPr(pr,index)} >
                    {this.select(pr)}
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
