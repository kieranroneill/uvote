import * as React from 'react';
import { connect } from 'react-redux';
import {
    ActionCreator,
    bindActionCreators,
    Dispatch,
} from 'redux';
import styled from 'styled-components';

// Action creators.
import {
    getCandidates,
    GetCandidatesActionCreator,
} from '../../store/candidates/actionCreators';
import { setPageTitle } from '../../store/layout/actionCreators';

// Config.
import { Titles } from '../../config/routes';

// Component.
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Main from '../../components/Main';

// Types.
import { ApplicationState } from '../../store';
import {
    Candidate,
    CandidatesState,
} from '../../store/candidates/types';
import { SetPageTitleAction } from '../../store/layout/types';

const Container = styled.div`
  padding: 2rem;
`;
const Content = styled.div`
  
`;
const Header = styled.div`
  margin: 0 0 1.5rem;
  text-align: center;
`;
const Wrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 800px;
  padding: 2rem 2rem 0;
  width: 80%;
`;

export interface Props {
    candidatesState: CandidatesState;
    getCandidates: GetCandidatesActionCreator;
    setPageTitle: ActionCreator<SetPageTitleAction>;
}

export class Results extends React.PureComponent<Props> {
    componentDidMount(): void {
        this.props.setPageTitle(Titles.Results);
        this.props.getCandidates();
    }

    render(): React.ReactNode {
        return (
            <Main>
                <Wrapper>
                    <Paper>
                        <Container>
                            <Header>
                                <Typography variant="display3">{this.getTotalVotes()}</Typography>
                                <Typography variant="display1">Total Votes</Typography>
                            </Header>
                            <Content>
                                <Typography variant="title">Ranking</Typography>
                            </Content>
                        </Container>
                    </Paper>
                </Wrapper>
            </Main>
        );
    }

    private getTotalVotes(): number {
        const { candidatesState } = this.props;
        let totalVotes: number = 0;

        candidatesState.items
            .map((item: Candidate) => item.votes)
            .forEach((votes: number) => totalVotes = totalVotes + votes);

        return totalVotes;
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    getCandidates: bindActionCreators(getCandidates, dispatch),
    setPageTitle: bindActionCreators(setPageTitle, dispatch),
});

const mapStateToProps = (state: ApplicationState) => ({
    candidatesState: state.candidatesState,
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
