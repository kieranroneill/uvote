// Types.
import { LayoutActionTypes } from './types';

// Action creators.
import {
    hideLoading,
    setPageTitle,
    showLoading,
} from './actionCreators';

describe('store/layout/actionCreators', () => {
    describe('hideLoading()', () => {
        it('should create an action to hide loading', () => {
            expect(hideLoading()).toEqual({
                type: LayoutActionTypes.HideLoading,
            });
        });
    });

    describe('setPageTitle()', () => {
        it('should create an action to set the page title', () => {
            const title: string = 'All the movies!';

            expect(setPageTitle(title)).toEqual({
                title,
                type: LayoutActionTypes.SetPageTitle,
            });
        });
    });

    describe('showLoading()', () => {
        it('should create an action to show loading', () => {
            expect(showLoading()).toEqual({
                type: LayoutActionTypes.ShowLoading,
            });
        });
    });
});
