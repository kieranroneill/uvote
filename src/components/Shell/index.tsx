import * as React from 'react';
import styled from 'styled-components';

// Styles.
import palette from '../../styles/palette';
import typography from '../../styles/typography';

interface Props {
    children: React.ReactNode;
}

const Wrapper = styled.div`
    background-color: ${palette.primary.lightGrey};
    display: flex;
    flex-direction: column;
    font-size: 100%;
    font-family: ${typography.primaryFontFamily};
    min-height: 100vh;
    width: 100%;
`;

const Shell: React.SFC<Props> = (props: Props) => (
    <Wrapper>
        {props.children}
    </Wrapper>
);

export default Shell;
export {
    Shell,
    Props
};
