import * as React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter,
    Redirect,
    Route,
    RouteComponentProps,
    Switch
} from 'react-router-dom';
import { Store } from 'redux';
import { injectGlobal } from 'styled-components';

// Config.
import { Routes } from './config/routes';

// Components.
import { MuiThemeProvider } from '@material-ui/core/styles';
import Shell from './components/Shell';

// Pages.
import Candidates from './pages/Candidates';
import InstallMetaMask from './pages/InstallMetaMask';
import Results from './pages/Results';

// Store.
import {
    ApplicationState,
    configureStore
} from './store';

// Styles.
import palette from './styles/palette';
import { theme } from './styles/theme';

injectGlobal`
  @font-face {
    font-family: "Material Icons";
    font-style: normal;
    font-weight: 400;
    src: url("${require('./fonts/material-icons/MaterialIcons.woff2')}") format("woff2");
  }
  @font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    src: url("${require('./fonts/roboto/Roboto-Regular.ttf')}") format("truetype"),
      url("${require('./fonts/roboto/Roboto-Regular.woff')}") format("woff"),
      url("${require('./fonts/roboto/Roboto-Regular.woff2')}") format("woff2");
  }

  @font-face {
    font-family: "Roboto";
    font-style: italic;
    font-weight: 400;
    src: url("${require('./fonts/roboto/Roboto-Italic.ttf')}") format("truetype"),
      url("${require('./fonts/roboto/Roboto-Italic.woff')}") format("woff"),
      url("${require('./fonts/roboto/Roboto-Italic.woff2')}") format("woff2");
  }

  @font-face {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    src: url("${require('./fonts/roboto/Roboto-Bold.ttf')}") format("truetype"),
      url("${require('./fonts/roboto/Roboto-Bold.woff')}") format("woff"),
      url("${require('./fonts/roboto/Roboto-Bold.woff2')}") format("woff2");
  }

  html,
  body,
  #root {
    margin: 0;
    width: 100%;
  }
  
  h1,
  h2,
  h3,
  h4,
  p,
  a {
    color: ${palette.primary.black};
    font-weight: 400;
    margin: 0;
  }
    
  h1 {
    font-size: 3.2rem;
  }
    
  h2 {
    font-size: 2.5rem;
  }
    
  h3 {
    font-size: 1.8rem;
  }
    
  h4 {
    font-size: 1.3rem;
  }
    
  a,
  p {
    font-size: 1rem;
  }
    
  a {
    display: inline-block;
    text-decoration: none;
    transition: all 250ms ease-in-out;
        
    &:hover {
      color: ${palette.primary.grey};
    }
  }
  
  .material-icons {
    font-family: "Material Icons", sans-serif;
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: "liga";
    -webkit-font-smoothing: antialiased;
}
`;

const store: Store<ApplicationState> = configureStore();

export class App extends React.PureComponent {
    static checkWeb3(props: RouteComponentProps<{}>, component: React.ReactNode): React.ReactNode {
        if (!window.web3) {
            return (
                <Redirect
                    to={{
                        pathname: Routes.InstallMetaMask,
                        state: { from: props.location }
                    }}
                />
            );
        }

        return component;
    }

    render(): React.ReactNode {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={theme}>
                    <BrowserRouter>
                        <Shell>
                            <Switch>
                                <Route
                                    component={InstallMetaMask}
                                    exact
                                    path={Routes.InstallMetaMask} />
                                <Route
                                    exact
                                    path={Routes.Candidates}
                                    render={(props: RouteComponentProps<{}>) => App.checkWeb3(props, <Candidates />)}
                                />
                                <Route
                                    exact
                                    path={Routes.Results}
                                    render={(props: RouteComponentProps<{}>) => App.checkWeb3(props, <Results />)}
                                />
                                <Redirect
                                    from="*"
                                    to={Routes.Candidates} />
                            </Switch>
                        </Shell>
                    </BrowserRouter>
                </MuiThemeProvider>
            </Provider>
        );
    }
}
