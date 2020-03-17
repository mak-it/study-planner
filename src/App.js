import React from 'react';
import logo from './logo.png';
import './App.css';
import { Provider } from 'react-redux';
import { HashRouter as Router } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import store from './store';
import StudyDirections from './StudyDirections';
import Courses from './Courses';
import Exams from './Exams';
import { useHistory, useRouteMatch } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#0B5F87',
      main: '#0B5F87',
      dark: '#053c57',
      contrastText: '#fff'
    }
  }
});

function Content() {
  const match = useRouteMatch("/:step");
  const activeStep = match ? parseInt(match.params.step, 10) : 1;
  const history = useHistory();

  return (
    <React.Fragment>
      {activeStep === 0 && <h1 className="Block-title">Izveido savu vidusskolu!</h1>}

      <Stepper activeStep={activeStep - 1} alternativeLabel>
        <Step key="1">
          <StepLabel>Izvēlies padziļinātos un specializētos kursus</StepLabel>
        </Step>
        <Step key="2">
          <StepLabel>Iepazīsti individuālo plānu</StepLabel>
        </Step>
        <Step key="3">
          <StepLabel>Uzzini par mācībām un eksāmeniem vidusskolā</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 1 &&
        <StudyDirections
          onNextStep={() => { history.push("/2"); window.scrollTo(0, 0) }}
        />
      }
      {activeStep === 2 &&
        <Courses
          onPrevStep={() => { history.push("/1"); window.scrollTo(0, 0) }}
          onNextStep={() => { history.push("/3"); window.scrollTo(0, 0) }}
        />
      }
      {activeStep === 3 &&
        <Exams
          onPrevStep={() => { history.push("/2"); window.scrollTo(0, 0) }} />
      }
    </React.Fragment>
  )
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <div className="App">
            <Container maxWidth="md">

              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </header>

              <Content />
            </Container>
          </div>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
