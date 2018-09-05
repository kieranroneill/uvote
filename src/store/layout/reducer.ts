import { Reducer } from 'redux';

// Types.
import {
    LayoutActions,
    LayoutActionTypes,
    LayoutState,
    PageConfig
} from './types';

// Utils.
import { getInitialState } from './utils';

const reducer: Reducer<LayoutState, LayoutActions> = (state: LayoutState = getInitialState(), action: LayoutActions) => {
    let page: PageConfig;

    switch (action.type) {
        case LayoutActionTypes.HideLoading:
            return {
                ...state,
                loading: false,
            };
        case LayoutActionTypes.SetPageTitle:
            page = {
                ...state.page,
                title: action.title,
            };

            return {
                ...state,
                page,
            };
        case LayoutActionTypes.ShowLoading:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default reducer;
