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
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddCandidateDialog from './components/AddCandidateDialog';
import { CandidateListItem } from './components/CandidateListItem';
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

// Utils.
import { createHash } from '../../utils/stringUtils';

const EmptyHeading = styled.h3`
  color: ${palette.primary.grey};
`;
const ProgressContainer = styled.div`
  align-content: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1rem;
`;
const Wrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  max-width: 800px;
  padding: 2rem 2rem 0;
  width: 80%;
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
                <ProgressContainer>
                    <CircularProgress
                        size={50}
                        style={{
                            color: palette.primary.grey,
                        }}
                    />
                </ProgressContainer>
            );
        }

        if (candidatesState.items.length > 0) {
            return (
                <Paper>
                    <List style={{
                        backgroundColor: palette.primary.white,
                        width: '100%',
                    }}>
                        {
                            candidatesState.items.map((value: Candidate, index: number) =>
                                <React.Fragment key={createHash(5)}>
                                    {
                                        index > 0 && <Divider />
                                    }
                                    <CandidateListItem
                                        candidate={value}
                                    />
                                </React.Fragment>
                            )
                        }
                    </List>
                </Paper>
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
                    <Typography
                        style={{
                            margin: '0 0 0.85rem',
                        }}
                        variant="title"
                    >
                        Current candidates
                    </Typography>
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
