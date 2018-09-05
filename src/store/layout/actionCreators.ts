import { ActionCreator } from 'redux';

// Types.
import {
    HideLoadingAction,
    LayoutActionTypes,
    SetPageTitleAction,
    ShowLoadingAction,
} from './types';

export const hideLoading: ActionCreator<HideLoadingAction> = () => ({
    type: LayoutActionTypes.HideLoading,
});

export const setPageTitle: ActionCreator<SetPageTitleAction> = (title: string) => ({
    title,
    type: LayoutActionTypes.SetPageTitle,
});

export const showLoading: ActionCreator<ShowLoadingAction> = () => ({
    type: LayoutActionTypes.ShowLoading,
});
