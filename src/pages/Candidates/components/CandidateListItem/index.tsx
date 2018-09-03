import * as React from 'react';
import styled from 'styled-components';

// Components.
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// Types.
import { Candidate } from '../../../../store/candidates/types';

const ButtonContainer = styled.div`
  padding: 0 0.5rem 0 0;
`;

export interface Props {
    candidate: Candidate;
    onClick: (candidate: Candidate) => void;
    onVoteClick: (candidate: Candidate) => void;
}

export const CandidateListItem: React.SFC<Props> = (props: Props) => (
    <ListItem
        button={true}
        onClick={() => props.onClick(props.candidate)}
    >
        <Avatar
            alt={props.candidate.name}
            src={require('./assets/placeholder.jpg')}
        />
        <ListItemText
            primary={props.candidate.name}
            secondary={props.candidate.party}
        />
        <ListItemSecondaryAction>
            <ButtonContainer>
                <Button
                    color="secondary"
                    onClick={() => props.onVoteClick(props.candidate)}
                    variant="outlined"
                >
                    Vote
                </Button>
            </ButtonContainer>
        </ListItemSecondaryAction>
    </ListItem>
);
