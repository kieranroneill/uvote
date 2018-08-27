// Types.
import { LayoutState } from './types';

/**
 * Convenience function for getting the initial state.
 * @returns the initial candidates state.
 */
export function getInitialState(): LayoutState {
    return {
        page: {
            title: 'uVote',
        },
    };
}
