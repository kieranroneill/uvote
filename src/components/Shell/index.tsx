import IPFS from 'ipfs';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { ActionCreator, bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';

// Action creators.
import {
    hideLoading,
    showLoading,
} from '../../store/layout/actionCreators';

// Components.
import LinearProgress from '@material-ui/core/LinearProgress';

// Contexts.
import { IpfsProvider } from '../IpfsContext';

// State.
import { ApplicationState } from '../../store';

// Styles.
import palette from '../../styles/palette';
import typography from '../../styles/typography';

// Types.
import {
    HideLoadingAction,
    LayoutState,
    ShowLoadingAction,
} from '../../store/layout/types';

const Wrapper = styled.div`
    background-color: ${palette.primary.lightGrey};
    display: flex;
    flex-direction: column;
    font-size: 100%;
    font-family: ${typography.primaryFontFamily};
    min-height: 100vh;
    width: 100%;
`;

export interface Props {
    children: React.ReactNode;
    hideLoading: ActionCreator<HideLoadingAction>;
    layoutState: LayoutState;
    showLoading: ActionCreator<ShowLoadingAction>;
}

export class Shell extends React.PureComponent<Props> {
    private ipfs: IPFS;

    constructor(props: Props) {
        super(props);

        // Start loading.
        this.props.showLoading();

        this.ipfs = new IPFS({});

        // When the ipfs has loaded, hide the loader.
        this.ipfs.on('ready', () => this.props.hideLoading());
    }

    public componentDidMount(): void{
        this.props.showLoading();
    }

    public render(): React.ReactElement<Shell> {
        const { ipfs } = this;
        const {
            children,
            layoutState,
        } = this.props;

        return (
            <IpfsProvider value={{ipfs}}>
                <Helmet>
                    <title>{`uVote - ${layoutState.page.title}`}</title>
                </Helmet>
                <Wrapper>
                    {
                        layoutState.loading ?
                            <LinearProgress /> :
                            children
                    }
                </Wrapper>
            </IpfsProvider>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    hideLoading: bindActionCreators(hideLoading, dispatch),
    showLoading: bindActionCreators(showLoading, dispatch),
});
const mapStateToProps = (state: ApplicationState) => ({
    layoutState: state.layoutState,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    { pure: false }
)(Shell);
