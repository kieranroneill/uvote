import * as React from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import { Store } from 'redux';
import { injectGlobal } from 'styled-components';

// Config.
import { Routes } from './config/routes';

// Components.
import { Shell } from './components/Shell';
import Candidates from './pages/Candidates';

// Store.
import {
    ApplicationState,
    configureStore
} from './store';

// Styles.
import palette from './styles/palette';

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

const App: React.SFC = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Shell>
                <Switch>
                    <Route
                        exact
                        path={Routes.Candidates}
                        component={ Candidates } />
                    <Redirect
                        from="*"
                        to={Routes.Candidates} />
                </Switch>
            </Shell>
        </BrowserRouter>
    </Provider>
);

export { App };
