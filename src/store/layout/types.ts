import { Action } from 'redux';

//====================================================
// States.
//====================================================

export interface LayoutState {
    page: PageConfig;
}

export interface PageConfig {
    title: string;
}

//====================================================
// Action types.
//====================================================

export enum LayoutActionTypes {
    SetPageTitle = '@layout/SET_PAGE_TITLE',
}

//====================================================
// Actions.
//====================================================

export interface SetPageTitleAction extends Action {
    title: string;
    type: LayoutActionTypes.SetPageTitle;
}

export type LayoutActions = SetPageTitleAction;
