import { BigNumber } from 'bignumber.js';
import Web3 from 'web3';

declare global {
    interface Window {
        web3: Web3;
    }
}

interface BallotContract {
    addCandidate: (name: string, party: string) => Promise<void>;
    getCandidate: (candidateId: number) => Promise<BigNumber>;
    getNumOfCandidates: () => Promise<BigNumber>;
}
