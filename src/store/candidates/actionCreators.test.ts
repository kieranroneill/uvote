// Action creators.
import { addCandidate } from './actionCreators';

// Types.
import {
    Candidate,
    CandidatesActionTypes,
} from './types';

describe('src/store/candidates/actionCreators', () => {
    describe('addCandidate()', () => {
        it('should create an action to add a candidate', () => {
            const candidate: Candidate = {
                id: '8ad6a8hdadhahda6d8has',
                name: 'Kieran the Dictator',
            };

            expect(addCandidate(candidate)).toEqual({
                candidate,
                type: CandidatesActionTypes.AddCandidate,
            });
        });
    });
});
