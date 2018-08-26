import { shallow } from 'enzyme';
import * as React from 'react';

// Components.
import {
    CandidateTile,
    Props
} from './index';

describe('src/pages/Candidates/components/CandidateTile', () => {
    let props: Props;

    beforeEach(() => {
        props = {
            candidate: {
                name: 'Kieran',
                party: 'Evil party'
            },
        };
    });

    describe('<CandidateTile /> snapshots', () => {
        it('should match the snapshot with default props', () => {
            expect(shallow(<CandidateTile {...props} />)).toMatchSnapshot();
        });
    });
});
