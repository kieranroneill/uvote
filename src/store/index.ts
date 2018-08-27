import {
    applyMiddleware,
    combineReducers,
    createStore,
    Reducer,
    Store
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

// Reducers.
import candidatesReducer from './candidates/reducer';
import layoutReducer from './layout/reducer';

// Types.
import { CandidatesState } from './candidates/types';
import { LayoutState } from './layout/types';

export interface ApplicationState {
    candidatesState: CandidatesState;
    layoutState: LayoutState;
}

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    candidatesState: candidatesReducer,
    layoutState: layoutReducer,
});

export function configureStore(): Store<ApplicationState> {
    return createStore(
        reducers,
        composeWithDevTools(
            applyMiddleware(
                thunkMiddleware
            )
        )
    );
}
