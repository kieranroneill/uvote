import { BigNumber } from 'bignumber.js';

// Types.
import { BallotContract } from '../../@types/global';
import {
    Candidate,
    CandidatesState,
} from './types';

/**
 * Convenience function for getting the initial state.
 * @returns the initial candidates state.
 */
export function getInitialState(): CandidatesState {
    return {
        error: '',
        items: [],
        loading: false,
    };
}

/**
 * Convenience function that gets all the information from the candidate.
 * @param instance an instance of the Ballot contract.
 * @param numberOfCandidates the number of candidates
 * @returns a Promise containing all the candidates.
 */
export async function getCandidatesFromContract(instance: BallotContract, numberOfCandidates: number): Promise<Candidate[]> {
    let getCandidatePromises: Promise<BigNumber>[] = [];
    let getVotesPromises: Promise<BigNumber>[] = [];
    let candidates: BigNumber[];
    let votes: BigNumber[];
    let items: Candidate[] = [];

    for (let i: number = 0; i < numberOfCandidates; i++) {
        getCandidatePromises.push(instance.getCandidate(i));
        getVotesPromises.push(instance.totalVotes(i));
    }

    candidates = await Promise.all(getCandidatePromises);
    votes = await Promise.all(getVotesPromises);

    for (let i: number = 0; i < numberOfCandidates; i++) {
        items.push({
            name: window.web3.toAscii(candidates[i][1]).replace(/\u0000/g, ''),
            party: window.web3.toAscii(candidates[i][2]).replace(/\u0000/g, ''),
            votes: votes[i].toNumber(),
        });
    }

    return items;
}
