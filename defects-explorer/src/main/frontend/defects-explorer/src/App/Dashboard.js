import React from 'react';
import PropTypes from 'prop-types';

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
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import StackOverflow from './StackOverflow'

const drawerWidth = 350;
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

class Dashboard extends React.Component {
    state = {
        open_drawer: false,
        open_list_1:false,
        open_list_2:false,
        show_content:[],
        show_resource:'',
        selected_value: null,
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
    setValue = (value,resource) => {
        this.setState(state => ({ show_resource: resource ,show_content: value }));
        //this.forceUpdate();
    }
    handleChange = event => {
        this.setState({ value: event.target.value });
    };
    handleDelete = (id,source) =>{
        console.log(1)
        // if(source==='GitHub')
        //     var url = 'http://localhost:8080/api/pull-requests/{'+id+'}/delete'
        // else
        //     var url = 'http://localhost:8080/api/so-qa-pages/{'+id+'}/delete'
        //
        // const myRequest = new Request(url, {method: 'POST'});
        //
        // fetch(myRequest)
        //     .then(response => {
        //     if (response.status === 200) {
        //         alert("Delete Sucessfully")
        //     } else {
        //         alert("Can't delete , server error")
        //     }
        // })
    }
    handleSave= (id,source) =>{
        var type=this.state.selected_value
        // if(source==='GitHub')
        //     var url = 'http://localhost:8080/api/pull-requests/{'+id+'}/'+type
        // else
        //     var url = 'http://localhost:8080/api/so-qa-pages/{'+id+'}/'+type
        //
        // const myRequest = new Request(url, {method: 'POST'});
        //
        // fetch(myRequest)
        //     .then(response => {
        //         if (response.status === 200) {
        //             alert("Select Sucessfully")
        //         } else {
        //             alert("Can't select , server error")
        //         }
        //     })
    }
    handleNext=(source,id)=>{
        if (source==="GitHub"){

        }else{

        }
    }
    showContent = (content,source,classes) => {
        if(source === 'GitHub'){
            return(
                <div>
                    <Typography variant="h6" gutterBottom >
                        Title: {content.title}
                    </Typography>

                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography > Body</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography  gutterBottom component="h5">
                                {content.body}
                            </Typography>
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
                                        {i+1}. {pr.body}
                                    </ListItem>

                                )}
                            </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                    <RadioGroup
                        aria-label="Type"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="Type1" control={<Radio />} label="Type1" />
                        <FormControlLabel value="Type2" control={<Radio />} label="Type2"/>
                        <FormControlLabel value="Type3" control={<Radio />} label="Type3" />
                    </RadioGroup>

                    <Button variant="contained"  className={classes.button} onClick = {() => this.handleDelete(content._id,'GitHub')}>
                        Delete
                        <DeleteIcon className={classes.rightIcon} />
                    </Button>
                    <Button variant="contained"  className={classes.button} onClick = {() => this.handleSave(content._id,'GitHub')}>
                        <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
                        Save
                    </Button>
                    <Button variant="contained"  size = "large"className={classes.button} onClick = {() => this.handleNext(source,content._id)}>
                        Next
                    </Button>

                </div>
            )
        }
        else if(source === 'StackOverflow'){
            return(
                <div>
                    <Typography variant="h6" gutterBottom >
                        Title: {content.ques_title}
                    </Typography>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Question body    ****Score: {content.ques_score} Upvote: {content.upvote} Downvote: {content.downvote}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div dangerouslySetInnerHTML={{__html: content.ques_body}}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Answer body    ****Score: {content.ans_score} </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div dangerouslySetInnerHTML={{__html: content.ques_body}}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <RadioGroup
                        aria-label="Type"
                        className={classes.group}
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        <FormControlLabel value="Type1" control={<Radio />} label="Type1" />
                        <FormControlLabel value="Type2" control={<Radio />} label="Type2"/>
                        <FormControlLabel value="Type3" control={<Radio />} label="Type3" />
                    </RadioGroup>

                    <Button variant="contained"  className={classes.button} onClick = {() =>this.handleDelete(content._id,'StackOverflow')}>
                        Delete
                        <DeleteIcon className={classes.rightIcon} />
                    </Button>
                    <Button variant="contained"  className={classes.button} onClick = {() =>this.handleSave(content._id,'StackOverflow')}>
                        <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
                        Save
                    </Button>
                    <Button variant="contained"  size = "large"className={classes.button} onClick = {() =>this.handleNext(source,content._id)}>
                        Next
                    </Button>
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

                            <ListItem button onClick={this.handleClick_1}>
                                <ListItemText inset primary="GitHub" />
                                {this.state.open_list_1 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.open_list_1&& this.state.open_drawer} timeout="auto"  >
                                <GitHub setValue={this.setValue}/>
                            </Collapse>

                            <ListItem button onClick={this.handleClick_2}>
                                <ListItemText inset primary="StackOverflow" />
                                {this.state.open_list_2 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.open_list_2 && this.state.open_drawer} timeout="auto" unmountOnExit>
                                <StackOverflow setValue={this.setValue}/>
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