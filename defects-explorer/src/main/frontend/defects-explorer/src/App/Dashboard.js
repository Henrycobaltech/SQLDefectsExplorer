import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GitHub from './GitHub'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import classNames from 'classnames';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import StackOverflow from './StackOverflow'
import MobileStepper from '@material-ui/core/MobileStepper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import marked from 'marked';
const drawerWidth = 350;
const isDebug = false;

const apiHost = isDebug?"http://localhost:8080":"";
const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
});

const initialType = {'Crash':false,'Low model performance':false,'Not converge':false,'Slow execution':false,'Security':false,'Unknown':false};
class Dashboard extends React.Component {
    state = {
        open_drawer: false,
        open_list_1:false,
        open_list_2:false,
        show_content:[],
        show_resource:'',
        activeStep1:0,//S
        activeStep2:0,//G
        totalpage1:10,//S
        totalpage2:10,//G
        currentindex1:0,//Stackoverflow
        currentcontent1:[],//S
        currentindex2:0, //GitHub
        currentcontent2:[],//G

        selected_types:[],
        types_status:initialType
    };

    handleDrawerOpen = () => {
        this.setState({ open_drawer: true });
    };

    handleClick_1 = () => {
        this.setState(state => ({ open_list_1: !state.open_list_1 }));
    };
    handleClick_2 = () => {
        this.setState(state => ({ open_list_2: !state.open_list_2 }));
    };
    toggleDrawer = ( open) => () => {
        this.setState({
            open_drawer: open,
        });
    };

    setValue = (value,resource,index) => {//stackoverflow
        if (resource=="GitHub"){
            this.setState(state => ({ show_resource: resource ,show_content: value ,currentindex2:index,selected_types:value['categories'].slice()}));
        }else{
            this.setState(state => ({ show_resource: resource ,show_content: value ,currentindex1:index,selected_types:value['categories'].slice()}));
        }
            this.forceUpdate();
    }

    setPage = (page,totalpage,resource)=>{
        if (resource == 'GitHub'){
            this.setState(state => ({ currentcontent2: page , totalpage2:totalpage }));
        }else{
            this.setState(state => ({ currentcontent1: page , totalpage1:totalpage }));
        }
        this.forceUpdate()
    }

    handleChange = (name)  => {
        var l = this.state.selected_types;
        var t = l.indexOf(name)
        console.log(t )
        if (t!==-1){
            l.splice(t,1)
            console.log(l)
        }
        else{
            l.push(name)
        }
        this.setState(state => ({
            selected_types: l,
        }));

    };



    handleNext = (source) => {
        return () =>{if(source=='G') {
            this.setState(state => ({
                activeStep2: state.activeStep2 + 1,
                open_list_2:false
            }));
        }else{
            this.setState(state => ({
                activeStep1: state.activeStep1 + 1,
                open_list_1:false
            }));
        };
        }

    }

    handleBack = (source) => {
        return () =>{if(source==='G') {
            this.setState(state => ({
                activeStep2: state.activeStep2 - 1,
                open_list_2:false
            }));
        }else{
            this.setState(state => ({
                activeStep1: state.activeStep1 - 1,
                open_list_1:false
            }));
        };}
    }

    handleSave= (id,source) =>{
        let type=this.state.selected_types;
        if(source==='GitHub') {
            var url = `${apiHost}/api/pull-requests/${id}/categories`
            var s = this.state.currentcontent2
            var t = this.state.currentindex2
            s[t]['categories'] = type
            console.log(s[t])
            this.setState(state=>({currentcontent2:s}))
        }
        else{
            var url = `${apiHost}/api/so-qa-pages/${id}/categories`
            var s = this.state.currentcontent1
            var t = this.state.currentindex1
            s[t]['categories'] = type
            this.setState(state=>({currentcontent1:s}))

        }
        const myRequest = new Request(url, {method: 'PUT',body:JSON.stringify(type), headers:{
            'Content-Type': 'application/json'
            }});

        fetch(myRequest)
            .then(response => {
                if (response.status === 201) {
                    alert("Saved Sucessfully")
                } else {
                    alert("Can't save , server error")
                }
            })
        this.forceUpdate()
    }

    handleNextitem = (source)=>{
            if (source === "GitHub") {
                var i = this.state.currentindex2;
                if(i < this.state.currentcontent2.length-1) {
                    this.setState(state => ({
                        show_content: state.currentcontent2[i + 1],
                        currentindex2: state.currentindex2 + 1,
                        selected_types: state.currentcontent2[i+1]['categories'].slice()
                    }));
                    console.log(this.state.currentcontent2[i+1]['categories'])
                }else{
                    if (this.state.activeStep2<this.state.totalpage2) {
                        var apiHost = isDebug ? "http://localhost:8080" : "";
                        var page = this.state.activeStep2 + 1;

                        fetch(`${apiHost}/api/pull-requests?page_idx=${page}&page_size=50`)
                            .then(res => res.json())
                            .then(prs => {
                                this.setState({
                                    selected_types: prs.content[0]['categories'].slice(),
                                    currentcontent2: prs.content,
                                    totalpage2: prs.totalPages,
                                    activeStep2: page,
                                    currentindex2: 0,
                                    show_content: prs.content[0]
                                });
                            });
                    }
                }
            } else {
                var i = this.state.currentindex1;
                if(i < this.state.currentcontent1.length-1) {
                    this.setState(state => ({
                        show_content: state.currentcontent1[i + 1],
                        currentindex1: state.currentindex1 + 1,
                        selected_types:state.currentcontent1[i + 1]['categories'].slice()
                    }));
                }else{
                    if (this.state.activeStep1<this.state.totalpage1) {
                        var apiHost = isDebug ? "http://localhost:8080" : "";
                        var page = this.state.activeStep1 + 1;
                        fetch(`${apiHost}/api/so-qa-pages?page_idx=${page}&page_size=50`)
                            .then(res => res.json())
                            .then(prs => {
                                this.setState({
                                    selected_types:prs.content[0]['categories'].slice() ,
                                    currentcontent1: prs.content,
                                    totalpage1: prs.totalPages,
                                    activeStep1: page,
                                    currentindex1: 0,
                                    show_content: prs.content[0]
                                });
                            });
                    }
                }
            }
    }
    handleLastitem = (source)=>{
        if (source === "GitHub") {
            var i = this.state.currentindex2;
            if(i > 0) {
                this.setState(state => ({
                    show_content: state.currentcontent2[i - 1],
                    currentindex2: state.currentindex2 - 1,
                    selected_types:state.currentcontent2[i - 1]['categories'].slice()
                }));
            }else{
                if(this.state.activeStep2>0) {
                    var apiHost = isDebug ? "http://localhost:8080" : "";
                    var page = this.state.activeStep2 - 1;

                    fetch(`${apiHost}/api/pull-requests?page_idx=${page}&page_size=50`)
                        .then(res => res.json())
                        .then(prs => {
                            this.setState({
                                selected_types: prs.content[49]['categories'].slice(),
                                currentcontent2: prs.content,
                                totalpage2: prs.totalPages,
                                activeStep2: page,
                                currentindex2: 49,
                                show_content: prs.content[49]
                            });
                        });
                }
            }
        } else {
            var i = this.state.currentindex1;
            if(i >0) {
                this.setState(state => ({
                    show_content: state.currentcontent1[i - 1],
                    currentindex1: state.currentindex1 - 1,
                    selected_types:state.currentcontent1[i - 1]['categories'].slice()
                }));
            }else{
                if(this.state.activeStep1>0) {
                    var apiHost = isDebug ? "http://localhost:8080" : "";
                    var page = this.state.activeStep1 - 1;
                    fetch(`${apiHost}/api/so-qa-pages?page_idx=${page}&page_size=50`)
                        .then(res => res.json())
                        .then(prs => {
                            this.setState({
                                selected_types: prs.content[49]['categories'].slice(),
                                currentcontent1: prs.content,
                                totalpage1: prs.totalPages,
                                activeStep1: page,
                                currentindex1: 49,
                                show_content: prs.content[49]
                            });
                        });
                }
            }
        }
    }

    showContent = (content,source,classes) => {
        console.log(content)
        if(source === 'GitHub'){
            const prUrl = `https://github.com/${content.repoName}/pull/${content.issueNumber}`;
            return(
                <div>
                    <Typography variant="h6" gutterBottom >
                        Title: {content.title}
                    </Typography>

                    <a href={ prUrl } target="_blank" rel="noopener noreferrer">{ prUrl }</a>
                    <Typography variant="h6" gutterBottom >
                        Repo: {content.repoName}
                    </Typography>
                    <Typography variant="h6" gutterBottom >
                        Is Merged: {content.merged ? "Yes":"No"}
                    </Typography>
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Crash')!==-1} onClick={()=>this.handleChange('Crash')}/>} label="Crash"/>
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Low model performance')!==-1} onChange={()=>this.handleChange('Low model performance')}/>} label="Low model performance"/>
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Not converge')!==-1} onChange={()=>this.handleChange('Not converge')} />} label="Not converge" />
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Slow execution')!==-1} onChange={()=>this.handleChange('Slow execution')} />} label="Slow execution" />
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Security')!==-1} onChange={()=>this.handleChange('Security')} />} label="Security" />
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Unknown')!==-1} onChange={()=>this.handleChange('Unknown')} />} label="Unknown" />
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Noise')!==-1} onChange={()=>this.handleChange('Noise')} />} label="Noise" />
                    </FormGroup>

                    <Button variant="contained"  size = "large"className={classes.button} onClick = {() => this.handleLastitem('GitHub')}>
                        Last
                    </Button>
                    <Button variant="contained"  className={classes.button} onClick = {() => this.handleSave(content.id,'GitHub')}>
                        <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
                        Save
                    </Button>
                    <Button variant="contained"  size = "large"className={classes.button} onClick = {() => this.handleNextitem('GitHub')}>
                        Next
                    </Button>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography > Body</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div dangerouslySetInnerHTML={{__html: marked(content.body)}}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Comments</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <List>
                                {content.comments.map((pr,i) =>
                                    <ListItem key = {1}>
                                        {i+1}. <div dangerouslySetInnerHTML={{__html: marked(pr.body)}}/>
                                    </ListItem>

                                )}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            )
        }
        else if(source === 'StackOverflow'){
            return(
                <div>
                    <Typography variant="h6" gutterBottom >
                        Title: {content.title}
                    </Typography>
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Crash')!==-1} onChange={()=>this.handleChange('Crash')}/>} label="Crash"/>
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Low model performance')!==-1} onChange={()=>this.handleChange('Low model performance')}/>} label="Low model performance"/>
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Not converge')!==-1} onChange={()=>this.handleChange('Not converge')} />} label="Not converge" />
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Slow execution')!==-1} onChange={()=>this.handleChange('Slow execution')} />} label="Slow execution" />
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Security')!==-1} onChange={()=>this.handleChange('Security')} />} label="Security" />
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Unknown')!==-1} onChange={()=>this.handleChange('Unknown')} />} label="Unknown" />
                        <FormControlLabel control={<Checkbox checked = {this.state.selected_types.indexOf('Noise')!==-1} onChange={()=>this.handleChange('Noise')} />} label="Noise" />
                    </FormGroup>

                    <Button variant="contained"  size = "large"className={classes.button} onClick = {() => this.handleLastitem('StackOverflow')}>
                        Last
                    </Button>
                    <Button variant="contained"  className={classes.button} onClick = {() =>this.handleSave(content.id,'StackOverflow')}>
                        <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
                        Save
                    </Button>
                    <Button variant="contained"  size = "large"className={classes.button} onClick = {() =>this.handleNextitem('StackOverflow')}>
                        Next
                    </Button>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Question body    ****Score: {content.questionScore} Upvote: {content.upvotes} Downvote: {content.downvotes}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div dangerouslySetInnerHTML={{__html: content.body}}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Answer body    ****Score: {content.answerScore} </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div dangerouslySetInnerHTML={{__html: content.answer}}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            )
        }else{
            return (
                <Typography variant="h5" gutterBottom >
                    No selected item
                </Typography>
            )
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar
                        position="absolute"
                        className={classNames(classes.appBar, this.state.open_drawer && classes.appBarShift)}
                    >
                        <Toolbar disableGutters={!this.state.open_drawer} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                className={classes.title}
                            >
                                Label Platform
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <SwipeableDrawer
                        open={this.state.open_drawer}
                        onClose={this.toggleDrawer(false)}
                        onOpen={this.toggleDrawer(true)}
                    >
                        <Divider />
                        <List>
                            <ListItem button onClick={this.handleClick_2}>
                                <ListItemText inset primary="GitHub" />
                                {this.state.open_list_2 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.open_list_2 & this.state.open_drawer} timeout="auto" unmountOnExit >
                                <GitHub setValue={this.setValue} pagevalue = {this.state.activeStep2} setPage = {this.setPage}/>
                                <MobileStepper
                                    variant="progress"
                                    steps={this.state.totalpage2}
                                    position="static"
                                    activeStep={this.state.activeStep2}
                                    className={classes.root}
                                    nextButton={
                                        <Button size="small" onClick={this.handleNext('G')} disabled={this.state.activeStep2 === this.state.totalpage2}>
                                            Next
                                            <KeyboardArrowRight />
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={this.handleBack('G')} disabled={this.state.activeStep2 === 0}>
                                            <KeyboardArrowLeft />
                                            Back
                                        </Button>
                                    }
                                />
                            </Collapse>

                            <ListItem button onClick={this.handleClick_1}>
                                <ListItemText inset primary="StackOverflow" />
                                {this.state.open_list_1 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.open_list_1 && this.state.open_drawer} timeout="auto" unmountOnExit>
                                <StackOverflow setValue={this.setValue} pagevalue = {this.state.activeStep1} setPage = {this.setPage}/>
                                <MobileStepper
                                    variant="progress"
                                    steps={this.state.totalpage1}
                                    position="static"
                                    activeStep={this.state.activeStep1}
                                    className={classes.root}
                                    nextButton={
                                        <Button size="small" onClick={this.handleNext('S')} disabled={this.state.activeStep1 === this.state.totalpage1}>
                                            Next
                                            <KeyboardArrowRight />
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={this.handleBack('S')} disabled={this.state.activeStep1 === 0}>
                                            <KeyboardArrowLeft />
                                            Back
                                        </Button>
                                    }
                                />
                            </Collapse>
                        </List>
                        <Divider />
                    </SwipeableDrawer>

                    <main className={classes.content} >
                        <div className={classes.appBarSpacer} />
                        <Typography variant="h4" gutterBottom component="h5">
                            Source: {this.state.show_resource}
                        </Typography>
                        <div >
                            {this.showContent(this.state.show_content,this.state.show_resource,classes)}
                        </div>

                    </main>
                </div>
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(Dashboard);