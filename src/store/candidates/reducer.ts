import { Reducer } from 'redux';

// Types.
import { CandidatesActions, CandidatesActionTypes, CandidatesState } from './types';

// Utils.
import { getInitialState } from './utils';

const reducer: Reducer<CandidatesState, CandidatesActions> = (state: CandidatesState = getInitialState(), action: CandidatesActions) => {
    switch (action.type) {
        case CandidatesActionTypes.AddCandidateSuccess:
            // Add the candidate to the local store.
            state.items.push(action.candidate);

            return {
                ...state,
                error: '',
                loading: false,
            };
        case CandidatesActionTypes.CandidatesError:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case CandidatesActionTypes.CandidatesRequest:
            return {
                ...state,
                loading: true,
            };
        case CandidatesActionTypes.GetCandidatesSuccess:
            return {
                ...state,
                items: action.items,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
