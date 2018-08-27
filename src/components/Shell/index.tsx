import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';

// State.
import { ApplicationState } from '../../store';

// Styles.
import palette from '../../styles/palette';
import typography from '../../styles/typography';

// Types.
import { LayoutState } from '../../store/layout/types';

const Wrapper = styled.div`
    background-color: ${palette.primary.lightGrey};
    display: flex;
    flex-direction: column;
    font-size: 100%;
    font-family: ${typography.primaryFontFamily};
    min-height: 100vh;
    width: 100%;
`;

interface Props {
    children: React.ReactNode;
    layoutState: LayoutState;
}

const Shell: React.SFC<Props> = (props: Props) => (
    <>
        <Helmet>
            <title>{`uVote - ${props.layoutState.page.title}`}</title>
        </Helmet>
        <Wrapper>
            {props.children}
        </Wrapper>
    </>
);

const mapStateToProps = (state: ApplicationState) => ({
    layoutState: state.layoutState,
});

export default connect(
    mapStateToProps,
    null,
    null,
    { pure: false }
)(Shell);
export {
    Shell,
    Props
};
