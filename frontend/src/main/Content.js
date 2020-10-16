import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {Redirect, Route, Switch} from "react-router-dom";
import Events from "./events/eventTypes/Events";
import EventsContainer from "./events/EventsContainer";
import FourOFour from "../misc/notFound/FourOFour";


const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        position: "relative",
        overflow: 'auto',

        padding: "12px"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        maxWidth: "500px",
        minHeight: "100%",
        margin: "auto",
        display: "flex",
        //justifyContent: "space-evenly"
    },
    logo: {
        transform: "translate(20px, 20px)",
        transition: "0.25s ease-in-out",
        marginBottom: "30px"

    },
    events: {
        maxWidth: "500px",
        margin: "auto"
    },
    contentGrid: {
        display: "flex",
        justifyContent: "space-evenly"
    }

}));


export default function Content() {

const classes = useStyles();


return (
    <React.Fragment>
    <main className={classes.content} id={"content"}>
    <Container maxWidth="lg" className={classes.container}>
        <Grid container className={classes.contentGrid} spacing={3} style={{minHeight: "100%"}}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/learners" />
                </Route>
                <Route
                    path='/learners'
                    exact
                    component={() => <EventsContainer category={1}
                                             title="Language Learners"/>}
                />
                <Route
                    path='/educators'
                    exact
                    component={() => <EventsContainer category={2}
                                             title="Language Educators"/>}
                />
                <Route
                    path='/employers'
                    exact
                    component={() => <EventsContainer category={3}
                                             title="Employers, Language Service Providers and H.R. Personnel"

                    />}
                />
                <Route
                    path='/administrators'
                    strict
                    component={() => <EventsContainer category={4}
                                             title="Administrators, Counselors and College Recruiters"/>}
                />
                <Route
                    path='/contentproviders'
                    strict
                    component={() => <EventsContainer category={5}
                                             title="Language Learning Content and Assessment Providers"/>}
                />
                <Route component={FourOFour} />
            </Switch>

        </Grid>
    </Container>
    </main>
    </React.Fragment>
  );

}
