import { shallow } from 'enzyme';
import * as React from 'react';

// Components.
import { Main } from './';

describe('src/components/Main', () => {
    describe('<Main /> snapshots', () => {
        it('should match the snapshot with default props', () => {
            expect(
                shallow(
                    <Main>
                        <h1>Hello human</h1>
                    </Main>
                )
            ).toMatchSnapshot();
        });
    });
});
