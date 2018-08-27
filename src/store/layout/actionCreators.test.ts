// Types.
import { LayoutActionTypes } from './types';

// Action creators.
import { setPageTitle } from './actionCreators';

describe('store/layout/actionCreators', () => {
    describe('setPageTitle()', () => {
        it('should create an action to set the page title', () => {
            const title: string = 'All the movies!';

            expect(setPageTitle(title)).toEqual({
                title,
                type: LayoutActionTypes.SetPageTitle,
            });
        });
    });
});
