import React, { Component } from 'react';
import {  List, ListItem, ListItemText } from '@material-ui/core';
import './GitHub.css';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import StarIcon from '@material-ui/icons/Star';

const isDebug = true;

const apiHost = isDebug?"http://localhost:8080":"";

class StackOverflow extends Component {
    state = {
        ques: [],
        selectedPr: null,
        // activeStep:0,
        // totalpage:10
    }
    componentDidMount() {
        var page = this.props.pagevalue
        // while(true) {
        fetch(`${apiHost}/api/so-qa-pages?page_idx=${page}&page_size=50`)
            .then(res => res.json())
            .then(prs => {this.setState({ques: prs.content});this.props.setPage(prs.content,prs.totalPages,"StackOverFlow")});
        // }
    }
    // handleNext = () => {
    //     return () => {
    //         this.setState(state => ({
    //             activeStep: state.activeStep + 1,
    //         }));
    //     }
    //
    // }
    //
    // handleBack = () => {
    //     return () => {
    //         this.setState(state => ({
    //             activeStep: state.activeStep - 1,
    //         }));
    //     }
    // }

    selectPr(pr,index) {
        return () => {
            this.setState({
                selectedPr: pr
            }, function () {
                this.props.setValue(pr, "StackOverflow",index);
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
                        this.state.ques.map((pr,index) =>
                            <ListItem button key={pr._id} onClick={this.selectPr(pr,index)}>
                                {this.select(pr)}
                                <ListItemText primary={pr.title}  />
                            </ListItem>
                        )
                    }
                </List>
                {/*<MobileStepper*/}
                    {/*variant="progress"*/}
                    {/*steps={this.state.totalpage}*/}
                    {/*position="static"*/}
                    {/*activeStep={this.state.activeStep}*/}
                    {/*nextButton={*/}
                        {/*<Button size="small" onClick={this.handleNext('S')} disabled={this.state.activeStep === this.state.totalpage}>*/}
                            {/*Next*/}
                            {/*<KeyboardArrowRight />*/}
                        {/*</Button>*/}
                    {/*}*/}
                    {/*backButton={*/}
                        {/*<Button size="small" onClick={this.handleBack('S')} disabled={this.state.activeStep === 0}>*/}
                            {/*<KeyboardArrowLeft />*/}
                            {/*Back*/}
                        {/*</Button>*/}
                    {/*}*/}
                {/*/>*/}
            </div>

        );
    }
}

export default StackOverflow;
