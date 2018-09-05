// Reducer.
import reducer from './reducer';

// Types.
import {
    HideLoadingAction,
    LayoutActionTypes,
    LayoutState,
    SetPageTitleAction,
    ShowLoadingAction,
} from './types';

// Utils.
import { getInitialState } from './utils';

interface Scope {
    initialState: LayoutState;
}

describe('src/store/layout/reducer', () => {
    let scope: Scope;

    beforeEach(() => {
        scope = {
            initialState: getInitialState(),
        };
    });

    describe('LayoutActionTypes.HideLoading', () => {
        it('should set the loading state to false', () => {
            const action: HideLoadingAction = {
                type: LayoutActionTypes.HideLoading,
            };

            scope.initialState.loading = true;

            expect(reducer(scope.initialState, action).loading).toBe(false);
        });
    });

    describe('LayoutActionTypes.SetPageTitle', () => {
        it('should set the title', () => {
            const title: string = 'Element 43';
            const action: SetPageTitleAction = {
                title,
                type: LayoutActionTypes.SetPageTitle,
            };

            expect(reducer(scope.initialState, action).page.title).toBe(title);
        });
    });

    describe('LayoutActionTypes.HideLoading', () => {
        it('should set the loading state to true', () => {
            const action: ShowLoadingAction = {
                type: LayoutActionTypes.ShowLoading,
            };

            scope.initialState.loading = false;

            expect(reducer(scope.initialState, action).loading).toBe(true);
        });
    });
});

