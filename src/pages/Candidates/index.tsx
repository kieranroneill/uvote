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
    addCandidate,
    AddCandidateActionCreator,
    getCandidates,
    GetCandidatesActionCreator,
} from '../../store/candidates/actionCreators';
import { setPageTitle } from '../../store/layout/actionCreators';

// Components.
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import AddCandidateDialog from './components/AddCandidateDialog';
import { CandidateTile } from './components/CandidateTile';
import Main from '../../components/Main';

// Config.
import { Titles } from '../../config/routes';

// Styles.
import palette from '../../styles/palette';

// Types.
import { ApplicationState } from '../../store';
import {
    Candidate,
    CandidatesState,
} from '../../store/candidates/types';
import { SetPageTitleAction } from '../../store/layout/types';

const EmptyHeading = styled.h3`
  color: ${palette.primary.grey};
`;
const Wrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 1440px;
  padding: 2rem 2rem 0;
`;

interface Props {
    addCandidate: AddCandidateActionCreator;
    candidatesState: CandidatesState;
    getCandidates: GetCandidatesActionCreator;
    setPageTitle: ActionCreator<SetPageTitleAction>;
}

interface State {
    isDialogOpen: boolean,
}

class Candidates extends React.PureComponent<Props, State> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            isDialogOpen: false,
        };

        // Bind functions.
        this.onDialogClose = this.onDialogClose.bind(this);
        this.onDialogOpenClick = this.onDialogOpenClick.bind(this);
    }

    componentDidMount(): void {
        this.props.setPageTitle(Titles.Candidates);
        this.props.getCandidates();
    }

    getCandidateTiles(): React.ReactNode {
        const { candidatesState } = this.props;

        if (candidatesState.loading) {
            return (
                <CircularProgress
                    size={50}
                    style={{
                        color: palette.primary.grey,
                    }} />
            );
        }

        if (candidatesState.items.length > 0) {
            return (
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
            );
        }

        return (
            <EmptyHeading>No candidates exist</EmptyHeading>
        );
    }

    onDialogClose(): void {
        this.setState({
            isDialogOpen: false,
        });
    }

    onDialogOpenClick(): void {
        this.setState({
            isDialogOpen: true,
        });
    }

    render(): React.ReactNode {
        const { isDialogOpen } = this.state;

        return (
            <Main>
                <Wrapper>
                    {this.getCandidateTiles()}
                </Wrapper>
                <Tooltip
                    placement="top-start"
                    title="Add candidate">
                    <Button
                        aria-label="Add candidate"
                        color="secondary"
                        onClick={this.onDialogOpenClick}
                        style={{
                            bottom: '2rem',
                            position: 'absolute',
                            right: '2rem',
                        }}
                        variant="fab">
                        <AddIcon />
                    </Button>
                </Tooltip>
                <AddCandidateDialog
                    onClose={this.onDialogClose}
                    open={isDialogOpen}
                />
            </Main>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addCandidate: bindActionCreators(addCandidate, dispatch),
    getCandidates: bindActionCreators(getCandidates, dispatch),
    setPageTitle: bindActionCreators(setPageTitle, dispatch),
});
const mapStateToProps = (state: ApplicationState) => ({
    candidatesState: state.candidatesState,
});

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);
export {
    Candidates,
    Props,
};
