import * as React from 'react';
import { connect } from 'react-redux';
import {
    bindActionCreators,
    Dispatch,
} from 'redux';
import styled from 'styled-components';

// Action creators.
import {
    addCandidate,
    AddCandidateActionCreator,
    getCandidates,
    GetCandidatesActionCreator,
} from '../../store/candidates/actionCreators';

// Components.
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Main } from '../../components/Main';
import { CandidateTile } from './components/CandidateTile';

// Types.
import { ApplicationState } from '../../store';
import {
    Candidate,
    CandidatesState,
} from '../../store/candidates/types';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  padding: 1rem 1rem 0;
`;

interface Props {
    addCandidate: AddCandidateActionCreator;
    candidatesState: CandidatesState;
    getCandidates: GetCandidatesActionCreator;
}

class Candidates extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);

        // Bind functions.
        this.onAddCandidate = this.onAddCandidate.bind(this);
    }

    componentDidMount(): void {
        this.props.getCandidates();
    }

    onAddCandidate(): void {
        console.log('clicked');
    }

    render(): React.ReactNode {
        const { candidatesState } = this.props;

        return (
            <Main>
                <Wrapper>
                    <Grid
                        container
                        justify="center"
                        spacing={16}>
                        {
                            candidatesState.items.map((value: Candidate, index: number) =>
                                <Grid
                                    item
                                    key={index}>
                                    <CandidateTile candidate={value} />
                                </Grid>
                            )
                        }
                    </Grid>
                </Wrapper>
                <Button
                    aria-label="Add candidate"
                    color="secondary"
                    style={{
                        bottom: '2rem',
                        position: 'fixed',
                        right: '2rem',
                    }}
                    variant="fab">
                    <AddIcon />
                </Button>
            </Main>
        );
    }
}

const mapDispatchToProps= (dispatch: Dispatch) => ({
    addCandidate: bindActionCreators(addCandidate, dispatch),
    getCandidates: bindActionCreators(getCandidates, dispatch),
});
const mapStateToProps = (state: ApplicationState) => ({
    candidatesState: state.candidatesState,
});

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);

export {
    Candidates,
    Props,
};
