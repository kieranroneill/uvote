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
} from './types';

export type GetCandidatesActionCreator = ActionCreator<ThunkAction<Promise<GetCandidatesAction>, ApplicationState, void, GetCandidatesAction>>;
export type AddCandidateActionCreator = ActionCreator<ThunkAction<Promise<AddCandidateAction>, ApplicationState, void, AddCandidateAction>>;

export const addCandidate: AddCandidateActionCreator = (candidate: Candidate) => {
    return async (dispatch: Dispatch): Promise<AddCandidateAction> => {
        const ballotContract: TruffleContract<BallotContract> = contract(require('../../../build/contracts/Ballot.json'));
        let instance: BallotContract;

        dispatch({
            type: CandidatesActionTypes.CandidatesRequest,
        });

        try {
            ballotContract.setProvider(window.web3.currentProvider);
            ballotContract.defaults({
                from: window.web3.eth.accounts[0],
                gas: 6721975
            });

            instance = await ballotContract.deployed();

            await instance.addCandidate(candidate.name, candidate.party);

            dispatch({
                candidate,
                type: CandidatesActionTypes.AddCandidateSuccess
            })
        } catch (error) {
            dispatch({
                error: 'failed to get candidates',
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
        const ballotContract: TruffleContract<BallotContract> = contract(require('../../../build/contracts/Ballot.json'));
        let instance: BallotContract;
        let numberOfCandidates: BigNumber;
        let getCandidatePromises: Promise<BigNumber>[] = [];
        let candidates: any[] = [];

        dispatch({
            type: CandidatesActionTypes.CandidatesRequest,
        });

        try {
            ballotContract.setProvider(window.web3.currentProvider);
            ballotContract.defaults({
                from: window.web3.eth.accounts[0],
                gas: 6721975
            });

            instance = await ballotContract.deployed();
            numberOfCandidates = await instance.getNumOfCandidates();

            console.log(numberOfCandidates.toString());

            for (let i: number = 0; i < numberOfCandidates.toNumber(); i++) {
                getCandidatePromises.push(instance.getCandidate(i));
            }

            candidates = await Promise.all(getCandidatePromises);

            console.dir(candidates);
            candidates.forEach((candidate: BigNumber) => {
                console.log(window.web3.toAscii(candidate[1]));
            });

            dispatch({
                items: [],
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
