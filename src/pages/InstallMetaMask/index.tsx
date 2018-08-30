import * as React from 'react';
import { connect } from 'react-redux';
import {
    ActionCreator,
    bindActionCreators,
    Dispatch,
} from 'redux';
import styled from 'styled-components';

// Action creator.
import { setPageTitle } from '../../store/layout/actionCreators';

// Config.
import { Titles } from '../../config/routes';

// Components.
import Button from '@material-ui/core/Button';

// Styles.
import palette from '../../styles/palette';

// Types.
import { SetPageTitleAction } from '../../store/layout/types';

const BottomButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;
const Header = styled.h2`
  color: ${palette.primary.black};
  margin: 0 0 1.5rem;
`;
const Image = styled.img`
  height: 200px;
  margin: 0 0 1.5rem;
  width: 200px;
`;
const Text = styled.p`
  color: ${palette.primary.black};
  margin: 0 0 1rem;
`;
const Wrapper = styled.main`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 0;
`;

export interface Props {
    setPageTitle: ActionCreator<SetPageTitleAction>;
}

export class InstallMetaMask extends React.PureComponent<Props> {
    componentDidMount(): void {
        this.props.setPageTitle(Titles.InstallMetaMask);
    }

    render(): React.ReactNode {
        return (
            <Wrapper>
                <Header>
                    Please Install MetaMask
                </Header>
                <Image
                    alt="The MetaMask logo"
                    src={require('./assets/metamask_logo.png')}
                />
                <Text>
                    uVote requires the MetaMask extension to be installed.
                </Text>
                <Text>
                    Please click below to go to the browser store and download the extension
                </Text>
                <Button
                    color="secondary"
                    href="https://metamask.io"
                    target="_blank"
                >
                    Get extension
                </Button>
                <BottomButtonContainer>
                    <Button
                        color="primary"
                        onClick={() => window.location.reload()}
                        variant="contained"
                    >
                        Already have the extension? Try again
                    </Button>
                </BottomButtonContainer>
            </Wrapper>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setPageTitle: bindActionCreators(setPageTitle, dispatch),
});

export default connect(undefined, mapDispatchToProps)(InstallMetaMask);
