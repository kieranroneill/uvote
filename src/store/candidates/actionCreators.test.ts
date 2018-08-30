// Action creators.
import { addCandidate } from './actionCreators';

// Types.
import { CandidatesActionTypes } from './types';

describe('src/store/candidates/actionCreators', () => {
    describe('addCandidate()', () => {
        it('should create an action to add a candidate', () => {
            const candidate: {
                name: string,
                party: string,
            } = {
                name: 'Kieran the Dictator',
                party: 'Evil party'
            };

            expect(addCandidate('a98s7a8ysha9d9adad9a6d9', candidate)).toEqual({
                candidate,
                type: CandidatesActionTypes.AddCandidate,
            });
        });
    });
});
