import { BigNumber } from 'bignumber.js';
import {
    ActionCreator,
    Dispatch
} from 'redux';
import { ThunkAction } from 'redux-thunk';
import contract, { TruffleContract } from 'truffle-contract';

// Types.
import { ApplicationState } from '../';
import { BallotContract } from '../../@types/global';
import {
    AddCandidateAction,
    Candidate,
    CandidatesActionTypes,
    GetCandidatesAction,
    VoteAction,
} from './types';

// Utils.
import { getCandidatesFromContract } from './utils';

const ballotContract: TruffleContract<BallotContract> = contract(require('../../../build/contracts/Ballot.json'));

export type GetCandidatesActionCreator = ActionCreator<ThunkAction<Promise<GetCandidatesAction>, ApplicationState, void, GetCandidatesAction>>;
export type AddCandidateActionCreator = ActionCreator<ThunkAction<Promise<AddCandidateAction>, ApplicationState, void, AddCandidateAction>>;
export type VoteActionCreator = ActionCreator<ThunkAction<Promise<VoteAction>, ApplicationState, void, AddCandidateAction>>;

export const addCandidate: AddCandidateActionCreator = (
    address: string,
    candidate: {
        name: string,
        party: string,
    }
) => {
    return async (dispatch: Dispatch): Promise<AddCandidateAction> => {
        let instance: BallotContract;

        dispatch({
            type: CandidatesActionTypes.CandidatesRequest,
        });

        try {
            ballotContract.setProvider(window.web3.currentProvider);
            ballotContract.defaults({ from: address });

            instance = await ballotContract.deployed();

            await instance.addCandidate(candidate.name, candidate.party);

            dispatch({
                candidate,
                type: CandidatesActionTypes.AddCandidateSuccess
            })
        } catch (error) {
            dispatch({
                error: 'failed to add candidate',
                type: CandidatesActionTypes.CandidatesError,
            });
        }

        return {
            candidate,
            type: CandidatesActionTypes.AddCandidate,
        }
    };
};

export const getCandidates: GetCandidatesActionCreator = () => {
    return async (dispatch: Dispatch): Promise<GetCandidatesAction> => {
        let instance: BallotContract;
        let numberOfCandidates: BigNumber;
        let items: Candidate[] = [];

        dispatch({
            type: CandidatesActionTypes.CandidatesRequest,
        });

        try {
            ballotContract.setProvider(window.web3.currentProvider);

            instance = await ballotContract.deployed();
            numberOfCandidates = await instance.getNumOfCandidates();
            items = await getCandidatesFromContract(instance, numberOfCandidates.toNumber());

            dispatch({
                items,
                type: CandidatesActionTypes.GetCandidatesSuccess
            })
        } catch (error) {
            dispatch({
                error: 'failed to get candidates',
                type: CandidatesActionTypes.CandidatesError,
            });
        }

        return {
            type: CandidatesActionTypes.GetCandidates,
        }
    };
};

export const vote: VoteActionCreator = (address: string, voterId: string, candidateId: number) => {
    return async (dispatch: Dispatch): Promise<VoteAction> => {
        let instance: BallotContract;

        try {
            ballotContract.setProvider(window.web3.currentProvider);
            ballotContract.defaults({ from: window.web3.eth.accounts[0] });

            instance = await ballotContract.deployed();

            await instance.vote(voterId, candidateId);

            dispatch({
                type: CandidatesActionTypes.VoteSuccess,
            })
        } catch (error) {
            dispatch({
                error: 'failed to vote for candidate',
                type: CandidatesActionTypes.CandidatesError,
            });
        }

        return {
            type: CandidatesActionTypes.Vote,
        };
    };
};
