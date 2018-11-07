import React, { Component } from 'react';
import {  List, ListItem, ListItemText } from '@material-ui/core';
import './GitHub.css';


class StackOverflow extends Component {

    state = {
        ques: [],
        selectedPr: null
    }
    componentDidMount() {
        fetch("http://localhost:8080/api/so-qa-pages?page_idx=1&page_size=10")
            .then(res => res.json())
            .then(prs => this.setState({ ques: prs }));
    }

    selectPr(pr) {
        return () => {
            this.setState({
                selectedPr: pr
            }, function () {
                this.props.setValue(pr, "StackOverflow");
            });
        }
    }
    /*fetchNext(id){
        var i = 0
        for( ; i<this.state.ques.length ; i++){
            if(this.state.ques[i]._id==id){
                break;
            }
        }
        return i+1<this.state.ques.length?this.state.ques[i+1]:{};
    }*/


    render() {
        return (
            <div className="app-root">
                <List>
                    {
                        this.state.ques.map(pr =>
                            <ListItem button key={pr._id} onClick={this.selectPr(pr)}>
                                <ListItemText primary={pr.title}  />
                            </ListItem>
                        )
                    }
                </List>
            </div>
        );
    }
}

export default StackOverflow;
