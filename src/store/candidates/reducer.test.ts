// Reducer.
import reducer from './reducer';

// Types.
import {
    AddCandidateSuccessAction,
    Candidate,
    CandidatesActionTypes,
    CandidatesErrorAction,
    CandidatesRequestAction,
    CandidatesState,
    GetCandidatesSuccessAction,
} from './types';

// Utils.
import { getInitialState } from './utils';

interface Scope {
    initialState: CandidatesState;
}

describe('src/store/candidates/reducer', () => {
    let scope: Scope;

    beforeEach(() => {
        scope = {
            initialState: getInitialState(),
        };
    });

    describe('CandidatesActionTypes.AddCandidateSuccess', () => {
        it('should stop loading and add the candidate', () => {
            const candidate: Candidate = {
                id: '8ad6a8hdadhahda6d8has',
                name: 'Kieran the Dictator',
            };
            const action: AddCandidateSuccessAction = {
                candidate,
                type: CandidatesActionTypes.AddCandidateSuccess,
            };
            let state: CandidatesState;

            scope.initialState.items = [];
            scope.initialState.loading = true;

            state = reducer(scope.initialState, action);

            expect(state.items.length).toBe(1);
            expect(state.loading).toBe(false);
        });
    });

    describe('CandidatesActionTypes.CandidatesError', () => {
        it('should set an error message when the post form request has failed', () => {
            const error: string = 'Uh..oh...';
            const action: CandidatesErrorAction = {
                type: CandidatesActionTypes.CandidatesError,
                error,
            };
            let state: CandidatesState;

            scope.initialState.loading = true;

            state = reducer(scope.initialState, action);

            expect(state.error).toBe(error);
            expect(state.loading).toBe(false);
        });
    });

    describe('CandidatesActionTypes.CandidatesRequest', () => {
        it('should start loading', () => {
            const action: CandidatesRequestAction = {
                type: CandidatesActionTypes.CandidatesRequest,
            };
            let state: CandidatesState;

            scope.initialState.loading = false;

            state = reducer(scope.initialState, action);

            expect(state.loading).toBe(true);
        });
    });

    describe('CandidatesActionTypes.AddCandidateSuccess', () => {
        it('should stop loading and add the candidate', () => {
            const items: Candidate[] = [
                {
                    id: '8ad6a8hdadhahda6d8has',
                    name: 'Kieran the Dictator',
                }
            ];
            const action: GetCandidatesSuccessAction = {
                items,
                type: CandidatesActionTypes.GetCandidatesSuccess,
            };
            let state: CandidatesState;

            scope.initialState.items = [];
            scope.initialState.loading = true;

            state = reducer(scope.initialState, action);

            expect(state.items).toEqual(items);
            expect(state.loading).toBe(false);
        });
    });
});
