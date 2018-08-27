import { ActionCreator } from 'redux';

// Types.
import {
    LayoutActionTypes,
    SetPageTitleAction
} from './types';

export const setPageTitle: ActionCreator<SetPageTitleAction> = (title: string) => ({
    title,
    type: LayoutActionTypes.SetPageTitle,
});
