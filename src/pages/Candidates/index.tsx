import * as React from 'react';
import { connect } from 'react-redux';
import {
    bindActionCreators,
    Dispatch,
} from 'redux';

// Action creators.
import {
    addCandidate,
    AddCandidateActionCreator,
    getCandidates,
    GetCandidatesActionCreator,
} from '../../store/candidates/actionCreators';

// Types.
import { ApplicationState } from '../../store';
import { CandidatesState } from '../../store/candidates/types';

interface Props {
    addCandidate: AddCandidateActionCreator;
    candidates: CandidatesState;
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
        this.props.addCandidate({
            name: 'Kieran',
            party: 'Evil party',
        });
    }

    render(): React.ReactNode {
        return (
            <>
                <div>Hello human!</div>
                <button onClick={this.onAddCandidate}>Add Candidate</button>
            </>
        );
    }
}

const mapDispatchToProps= (dispatch: Dispatch) => ({
    addCandidate: bindActionCreators(addCandidate, dispatch),
    getCandidates: bindActionCreators(getCandidates, dispatch),
});
const mapStateToProps = (state: ApplicationState) => ({
    candidates: state.candidatesState,
});

export default connect(mapStateToProps, mapDispatchToProps)(Candidates);

export {
    Candidates,
    Props,
};
