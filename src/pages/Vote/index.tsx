import * as React from 'react';
import { connect } from 'react-redux';
import {
    ActionCreator,
    bindActionCreators,
    Dispatch,
} from 'redux';

// Action creator.
import { setPageTitle } from '../../store/layout/actionCreators';

// Config.
import { Titles } from '../../config/routes';

// Components.
import Main from '../../components/Main';

// Types.
import { SetPageTitleAction } from '../../store/layout/types';

interface Props {
    setPageTitle: ActionCreator<SetPageTitleAction>;
}

class Vote extends React.PureComponent<Props> {
    componentDidMount(): void {
        this.props.setPageTitle(Titles.Vote);
    }

    render(): React.ReactNode {
        return (
            <Main>
                <h1>Vote</h1>
            </Main>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setPageTitle: bindActionCreators(setPageTitle, dispatch),
});

export default connect(undefined, mapDispatchToProps)(Vote);
export {
    Props,
    Vote,
};
