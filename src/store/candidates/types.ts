import { Action } from 'redux';

// ====================================================
// Actions.
// ====================================================

export interface AddCandidateAction extends Action {
    candidate: {
        name: string,
        party: string,
    };
    type: CandidatesActionTypes.AddCandidate;
}

export interface AddCandidateSuccessAction extends Action {
    candidate: Candidate;
    type: CandidatesActionTypes.AddCandidateSuccess;
}

export interface CandidatesErrorAction extends Action {
    type: CandidatesActionTypes.CandidatesError;
    error: string;
}

export interface CandidatesRequestAction extends Action {
    type: CandidatesActionTypes.CandidatesRequest;
}

export interface GetCandidatesAction extends Action {
    type: CandidatesActionTypes.GetCandidates;
}

export interface GetCandidatesSuccessAction extends Action {
    items: Candidate[];
    type: CandidatesActionTypes.GetCandidatesSuccess;
}

export type CandidatesActions = AddCandidateAction
    | AddCandidateSuccessAction
    | CandidatesErrorAction
    | CandidatesRequestAction
    | GetCandidatesAction
    | GetCandidatesSuccessAction;

// ====================================================
// Action types.
// ====================================================

export enum CandidatesActionTypes {
    AddCandidate = '@candidates/ADD_CANDIDATE',
    AddCandidateSuccess = '@candidates/ADD_CANDIDATE_SUCCESS',
    CandidatesError = '@candidates/CANDIDATES_ERROR',
    CandidatesRequest = '@candidates/CANDIDATES_REQUEST',
    GetCandidates = '@candidates/GET_CANDIDATES',
    GetCandidatesSuccess = '@candidates/GET_CANDIDATES_SUCCESS',
}

// ====================================================
// Responses.
// ====================================================

export interface Candidate {
    name: string;
    party: string;
    votes: number;
}

//====================================================
// States.
//====================================================

export interface CandidatesState {
    error: string;
    items: Candidate[];
    loading: boolean;
}
