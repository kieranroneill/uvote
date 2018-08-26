import * as React from 'react';
import styled from 'styled-components';

// Components.
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

// Styles.
import palette from '../../../../styles/palette';

// Types.
import { Candidate } from '../../../../store/candidates/types';

interface Props {
    candidate: Candidate;
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 250px;
  padding: 2rem;
  text-align: center;
`;
const Heading = styled.h3`
  color: ${palette.primary.black};
  margin: 0 0 0.5rem;
`;
const SubHeading = styled.h4`
  color: ${palette.primary.black};
  margin: 0 0 0.5rem;
`;

const styles = {
    profile: {
        height: '100px',
        margin: '0 auto 0.5rem auto',
        width: '100px'
    }
};

const CandidateTile: React.SFC<Props> = (props: Props) => (
    <Paper>
        <Content>
            <Avatar
                alt={props.candidate.name}
                src={require('./assets/placeholder.jpg')}
                style={styles.profile}
            />
            <Heading>
                {props.candidate.name}
            </Heading>
            <SubHeading>
                {props.candidate.party}
            </SubHeading>
            <SubHeading>
                {`Votes: ${props.candidate.votes}`}
            </SubHeading>
        </Content>
    </Paper>
);

export {
    CandidateTile,
    Props
};
