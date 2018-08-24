import { CandidatesState } from './types';

/**
 * Convenience function for getting the initial state.
 * @returns the initial candidates state.
 */
export function getInitialState(): CandidatesState {
    return {
        error: '',
        items: [],
        loading: false,
    };
}
