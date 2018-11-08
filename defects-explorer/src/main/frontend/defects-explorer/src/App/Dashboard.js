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
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import StackOverflow from './StackOverflow'
import MobileStepper from '@material-ui/core/MobileStepper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

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
        activeStep1:0,
        activeStep2:0,
        totalpage1:10,
        totalpage2:10,
        currentindex:0,
        currentcontent:[],
        currentindex2:0,
        currentcontent2:[],
        selected_types:[],
        types_status:{'type1':false,'type2':false,'type3':false}
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

    setValue = (value,resource,index) => {
        this.setState(state => ({ show_resource: resource ,show_content: value ,currentindex:index,selected_types:[],types_status:{'type1':false,'type2':false,'type3':false}}));
        //this.forceUpdate();
    }

    setPage = (page)=>{
        this.setState(state => ({ currentcontent: page }));
        //this.forceUpdate();
    }
    setPage2 = (page)=>{
        this.setState(state => ({ currentcontent2: page }));
        //this.forceUpdate();
    }

    handleChange = (name)  => {
        var l = this.state.selected_types;
        l.push(name)
        var s = this.state.types_status;
        s[name] = !s[name]
        this.setState(state => ({
            selected_types: l,
            types_status: s
        }));
    };

    handleDelete = (id,source) =>{

        if(source==='GitHub')
            var url = 'http://localhost:8080/api/pull-requests/'+id+'/categories'
        else
            var url = 'http://localhost:8080/api/so-qa-pages/'+id+'/categories'

        const myRequest = new Request(url, {method: 'PUT',body:['delete']});

        fetch(myRequest)
            .then(response => {
            if (response.status === 201) {
                alert("Delete Sucessfully")
            } else {
                alert("Can't delete , server error")
            }
        })
    }

    handleNext = (source) => {
        return () =>{if(source==='G') {
            this.setState(state => ({
                activeStep1: state.activeStep1 + 1,
                open_list_1:false
            }));
        }else{
            this.setState(state => ({
                activeStep2: state.activeStep2 + 1,
                open_list_2:false
            }));
        };this.forceUpdate() ;
        }

    }

    handleBack = (source) => {
        return () =>{if(source==='G') {
            this.setState(state => ({
                activeStep1: state.activeStep1 - 1,
                open_list_1:false
            }));
        }else{
            this.setState(state => ({
                activeStep2: state.activeStep2 - 1,
                open_list_2:false
            }));
        };this.forceUpdate() ;}
    }

    handleSave= (id,source) =>{
        var type=this.state.selected_types

        if(source=='GitHub')
            var url = 'http://localhost:8080/api/pull-requests/'+id+'/categories'
        else {

            var url = 'http://localhost:8080/api/so-qa-pages/' +id  + '/categories'
        }
        const myRequest = new Request(url, {method: 'PUT',body:type});

        fetch(myRequest)
            .then(response => {
                if (response.status === 201) {
                    alert("Saved Sucessfully")
                } else {
                    console.log(response.toString())
                    alert("Can't save , server error")
                }
            })
    }

    handleNextitem = (source)=>{
            if (source === "GitHub") {
                var i = this.state.currentindex2;
                if(i < this.state.currentcontent2.length) {
                    this.setState(state => ({
                        show_content: state.currentcontent2[i + 1],
                        currentindex2: state.currentindex2 + 1,
                        types_status: {'type1':false,'type2':false,'type3':false},
                        selected_types:[]
                    }));
                    this.forceUpdate()
                }
            } else {
                var i = this.state.currentindex;
                if(i < this.state.currentcontent2.length) {
                    this.setState(state => ({
                        show_content: state.currentcontent[i + 1],
                        currentindex: state.currentindex + 1,
                        types_status: {'type1':false,'type2':false,'type3':false},
                        selected_types:[]
                    }));
                    this.forceUpdate()
                }
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

                    {/*<RadioGroup*/}
                        {/*aria-label="Type"*/}
                        {/*className={classes.group}*/}
                        {/*value={this.state.value}*/}
                        {/*onChange={this.handleChange}*/}
                    {/*>*/}
                        {/*<FormControlLabel value="Type1" control={<Radio />} label="Type1" />*/}
                        {/*<FormControlLabel value="Type2" control={<Radio />} label="Type2"/>*/}
                        {/*<FormControlLabel value="Type3" control={<Radio />} label="Type3" />*/}
                    {/*</RadioGroup>*/}
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox checked = {this.state.types_status['type1']} onChange={()=>this.handleChange('type1')}/>} label="type1"/>
                        <FormControlLabel control={<Checkbox checked = {this.state.types_status['type2']} onChange={()=>this.handleChange('type2')}/>} label="type2"/>
                        <FormControlLabel control={<Checkbox checked = {this.state.types_status['type3']} onChange={()=>this.handleChange('type3')} />} label="type3" />
                    </FormGroup>
                    <Button variant="contained"  className={classes.button} onClick = {() => this.handleDelete(content.id,'GitHub')}>
                        Delete
                        <DeleteIcon className={classes.rightIcon} />
                    </Button>
                    <Button variant="contained"  className={classes.button} onClick = {() => this.handleSave(content.id,'GitHub')}>
                        <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
                        Save
                    </Button>
                    <Button variant="contained"  size = "large"className={classes.button} onClick = {() => this.handleNextitem('GitHub')}>
                        Next
                    </Button>

                </div>
            )
        }
        else if(source === 'StackOverflow'){
            return(
                <div>
                    <Typography variant="h6" gutterBottom >
                        Title: {content.title}
                    </Typography>
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
                    <FormGroup row>
                        <FormControlLabel control={<Checkbox checked = {this.state.types_status['type1']} onChange={()=>this.handleChange('type1')}/>} label="type1"/>
                        <FormControlLabel control={<Checkbox checked = {this.state.types_status['type2']} onChange={()=>this.handleChange('type2')}/>} label="type2"/>
                        <FormControlLabel control={<Checkbox checked = {this.state.types_status['type3']} onChange={()=>this.handleChange('type3')} />} label="type3" />
                    </FormGroup>
                    <Button variant="contained"  className={classes.button} onClick = {() =>this.handleDelete(content.id,'StackOverflow')}>
                        Delete
                        <DeleteIcon className={classes.rightIcon} />
                    </Button>
                    <Button variant="contained"  className={classes.button} onClick = {() =>this.handleSave(content.id,'StackOverflow')}>
                        <SaveIcon className={classNames(classes.rightIcon, classes.iconSmall)} />
                        Save
                    </Button>
                    <Button variant="contained"  size = "large"className={classes.button} onClick = {() =>this.handleNextitem('StackOverflow')}>
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
                                <GitHub setValue={this.setValue} pagevalue = {this.state.activeStep1} setPage = {this.setPage2}/>
                                <MobileStepper
                                    variant="progress"
                                    steps={this.state.totalpage1}
                                    position="static"
                                    activeStep={this.state.activeStep1}
                                    className={classes.root}
                                    nextButton={
                                        <Button size="small" onClick={this.handleNext('G')} disabled={this.state.activeStep1 === this.state.totalpage1}>
                                            Next
                                            <KeyboardArrowRight />
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={this.handleBack('G')} disabled={this.state.activeStep1 === 0}>
                                            <KeyboardArrowLeft />
                                            Back
                                        </Button>
                                    }
                                />
                            </Collapse>

                            <ListItem button onClick={this.handleClick_2}>
                                <ListItemText inset primary="StackOverflow" />
                                {this.state.open_list_2 ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.open_list_2 && this.state.open_drawer} timeout="auto" unmountOnExit>
                                <StackOverflow setValue={this.setValue} pagevalue = {this.state.activeStep2} setPage = {this.setPage}/>
                                <MobileStepper
                                    variant="progress"
                                    steps={this.state.totalpage2}
                                    position="static"
                                    activeStep={this.state.activeStep2}
                                    className={classes.root}
                                    nextButton={
                                        <Button size="small" onClick={this.handleNext('S')} disabled={this.state.activeStep2 === this.state.totalpage2}>
                                            Next
                                            <KeyboardArrowRight />
                                        </Button>
                                    }
                                    backButton={
                                        <Button size="small" onClick={this.handleBack('S')} disabled={this.state.activeStep2 === 0}>
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