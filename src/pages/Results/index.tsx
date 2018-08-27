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

// Component.
import Main from '../../components/Main';

// Types.
import { SetPageTitleAction } from '../../store/layout/types';

interface Props {
    setPageTitle: ActionCreator<SetPageTitleAction>;
}

class Results extends React.PureComponent<Props> {
    componentDidMount(): void {
        this.props.setPageTitle(Titles.Results);
    }

    render(): React.ReactNode {
        return (
            <Main>
                <h1>Results</h1>
            </Main>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setPageTitle: bindActionCreators(setPageTitle, dispatch),
});

export default connect(undefined, mapDispatchToProps)(Results);
export {
    Results,
};
