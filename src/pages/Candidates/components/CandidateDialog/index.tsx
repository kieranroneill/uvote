import * as React from 'react';

// Components.
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// State.
import { Candidate } from '../../../../store/candidates/types';

export interface Props {
    candidate?: Candidate;
    onClose: () => void;
    open: boolean;
}

export const CandidateDialog: React.SFC<Props> = (props: Props) => (
    <Dialog
        aria-labelledby="candidate-dialog"
        open={props.open}
        onClose={props.onClose}
        scroll="paper"
    >
        <DialogTitle id="candidate-dialog">
            Candidate
        </DialogTitle>
        <DialogContent>
            {props.candidate ? props.candidate.name : ''}
        </DialogContent>
        <DialogActions>
            <Button
                color="primary"
                onClick={props.onClose}
            >
                Dismiss
            </Button>
        </DialogActions>
    </Dialog>
);
