import { Reducer } from 'redux';

// Types.
import {
    LayoutActionTypes,
    LayoutState,
    LayoutActions,
    PageConfig
} from './types';

// Utils.
import { getInitialState } from './utils';

const reducer: Reducer<LayoutState, LayoutActions> = (state: LayoutState = getInitialState(), action: LayoutActions) => {
    let page: PageConfig;

    switch (action.type) {
        case LayoutActionTypes.SetPageTitle:
            page = {
                ...state.page,
                title: action.title,
            };

            return {
                ...state,
                page,
            };
        default:
            return state;
    }
};

export default reducer;
