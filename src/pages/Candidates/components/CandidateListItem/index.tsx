import * as React from 'react';

// Components.
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Styles.

// Types.
import { Candidate } from '../../../../store/candidates/types';

export interface Props {
    candidate: Candidate;
}

export const CandidateListItem: React.SFC<Props> = (props: Props) => (
    <ListItem button={true}>
        <Avatar
            alt={props.candidate.name}
            src={require('./assets/placeholder.jpg')}
        />
        <ListItemText
            primary={props.candidate.name}
            secondary={props.candidate.party}
        />
    </ListItem>
);
