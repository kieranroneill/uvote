import { shallow } from 'enzyme';
import * as React from 'react';

// Components.
import { Shell } from './';

describe('src/components/Shell', () => {
    describe('<Shell /> snapshots', () => {
        it('should match the snapshot with default props', () => {
            expect(
                shallow(
                    <Shell>
                        <h1>Hello human</h1>
                    </Shell>
                )
            ).toMatchSnapshot();
        });
    });
});
