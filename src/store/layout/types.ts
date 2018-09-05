import { Action } from 'redux';

//====================================================
// States.
//====================================================

export interface LayoutState {
    loading: boolean;
    page: PageConfig;
}

export interface PageConfig {
    title: string;
}

//====================================================
// Action types.
//====================================================

export enum LayoutActionTypes {
    HideLoading = '@layout/HIDE_LOADING',
    SetPageTitle = '@layout/SET_PAGE_TITLE',
    ShowLoading = '@layout/SHOW_LOADING',
}

//====================================================
// Actions.
//====================================================

export interface HideLoadingAction extends Action {
    type: LayoutActionTypes.HideLoading;
}

export interface SetPageTitleAction extends Action {
    title: string;
    type: LayoutActionTypes.SetPageTitle;
}

export interface ShowLoadingAction extends Action {
    type: LayoutActionTypes.ShowLoading;
}

export type LayoutActions = HideLoadingAction
    | SetPageTitleAction
    | ShowLoadingAction;
