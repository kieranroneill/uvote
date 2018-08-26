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

// Types.
import { CandidatesState } from './candidates/types';

export interface ApplicationState {
    candidatesState: CandidatesState;
}

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    candidatesState: candidatesReducer,
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
