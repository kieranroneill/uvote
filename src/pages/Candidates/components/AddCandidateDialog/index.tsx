import * as React from 'react';
import { connect } from 'react-redux';
import {
    bindActionCreators,
    Dispatch,
} from 'redux';
import styled from 'styled-components';

// Action creators.
import {
    AddCandidateActionCreator,
    addCandidate,
} from '../../../../store/candidates/actionCreators';

// Config.
import { InputErrorsEnum } from '../../../../config/errors';

// Components.
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

// State.
import { ApplicationState } from '../../../../store';
import {
    Candidate,
    CandidatesState,
} from '../../../../store/candidates/types';

// Styles.
import palette from '../../../../styles/palette';

const Form = styled.div`
  position: relative;
`;
const ProgressOverlay = styled.div`
  align-items: center;
  background-color: ${palette.primary.white};
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  opacity: 0.8;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
`;

enum InputEnum {
    Address = 'address',
    Name = 'name',
    Party = 'party',
}

interface InputConfig {
    error: string;
    value: string;
}

export interface Props {
    addCandidate: AddCandidateActionCreator;
    candidatesState: CandidatesState;
    onClose: () => void;
    open: boolean;
}

export interface State {
    [InputEnum.Address]: InputConfig;
    [InputEnum.Name]: InputConfig;
    [InputEnum.Party]: InputConfig;
}

export class AddCandidateDialog extends React.PureComponent<Props> {
    public state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            [InputEnum.Address]: {
                error: '',
                value: '',
            },
            [InputEnum.Name]: {
                error: '',
                value: '',
            },
            [InputEnum.Party]: {
                error: '',
                value: '',
            },
        };

        // Bind functions.
        this.onAddCandidateClick = this.onAddCandidateClick.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    componentDidUpdate(prevProps: Props): void {
        const { candidatesState } = this.props;
        const {
            name,
            party,
        } = this.state;

        if (prevProps.candidatesState.items.length < candidatesState.items.length) {
            if (candidatesState.items.filter((value: Candidate) => value.name === name.value && value.party === party.value)) {
                this.props.onClose();
            }
        }
    }

    public handleBlur = (name: InputEnum) => (event: React.FocusEvent<HTMLInputElement>) => {
        const { target: { value } } = event;
        const input: InputConfig = this.state[name];

        if (value.length <= 0) {
            input.error = InputErrorsEnum.Required;
        }

        this.setState({
            [name]: {
                ...input,
                value,
            },
        });
    };

    public handleChange = (name: InputEnum) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;
        const input: InputConfig = this.state[name];

        if (value.length > 0) {
            input.error = '';
        }

        this.setState({
            [name]: {
                ...input,
                value,
            },
        });
    };

    public onAddCandidateClick(): void {
        const { candidatesState } = this.props;
        const {
            address,
            name,
            party,
        } = this.state;

        if (!candidatesState.loading) {
            if (this.validate()) {
                this.props.addCandidate(
                    address.value,
                    {
                        name: name.value,
                        party: party.value,
                    }
                );
            }
        }
    }

    public onEnter(): void {
        this.setState({
            address: {
                error: '',
                value: '',
            },
            name: {
                error: '',
                value: '',
            },
            party: {
                error: '',
                value: '',
            },
        });
    }

    public render(): React.ReactElement<AddCandidateDialog> {
        const {
            candidatesState,
            onClose,
            open,
        } = this.props;
        const {
            address,
            name,
            party,
        } = this.state;

        return (
            <Dialog
                aria-labelledby="add-candidate-dialog"
                open={open}
                onClose={onClose}
                onEnter={this.onEnter}
                scroll="paper"
            >
                <DialogTitle id="add-candidate-dialog">
                    Add Candidate
                </DialogTitle>
                <DialogContent>
                    <Form>
                        {
                            candidatesState.loading &&
                                <ProgressOverlay>
                                    <CircularProgress
                                        size={50}
                                        style={{
                                            color: palette.primary.grey,
                                        }} />
                                </ProgressOverlay>
                        }
                        <TextField
                            error={!!name.error}
                            fullWidth={true}
                            helperText={name.error}
                            id={InputEnum.Name}
                            label="Name"
                            margin="normal"
                            onBlur={this.handleBlur(InputEnum.Name)}
                            onChange={this.handleChange(InputEnum.Name)}
                            required={true}
                            value={name.value}
                        />
                        <TextField
                            error={!!party.error}
                            fullWidth={true}
                            helperText={party.error}
                            id={InputEnum.Party}
                            label="Party"
                            margin="normal"
                            onBlur={this.handleBlur(InputEnum.Party)}
                            onChange={this.handleChange(InputEnum.Party)}
                            required={true}
                            value={party.value}
                        />
                        <TextField
                            error={!!address.error}
                            fullWidth={true}
                            helperText={address.error}
                            id={InputEnum.Address}
                            label="Address"
                            margin="normal"
                            onBlur={this.handleBlur(InputEnum.Address)}
                            onChange={this.handleChange(InputEnum.Address)}
                            required={true}
                            value={address.value}
                        />
                    </Form>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="primary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={this.onAddCandidateClick}
                    >
                        Add Candidate
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    private validate(): boolean {
        const {
            name,
            party,
        } = this.state;

        if (name.value.length <= 0) {
            name.error = InputErrorsEnum.Required;
        }

        if (party.value.length <= 0) {
            party.error = InputErrorsEnum.Required;
        }

        this.setState({
            name,
            party,
        }, () => this.forceUpdate());

        return !name.error
            && !party.error;
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    addCandidate: bindActionCreators(addCandidate, dispatch),
});
const mapStateToProps = (state: ApplicationState) => ({
    candidatesState: state.candidatesState,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCandidateDialog);
