import * as React from 'react';
import styled from 'styled-components';

interface Props {
    children: React.ReactNode;
}

const Wrapper = styled.main`
    width: 100%;
`;

const Main: React.SFC<Props> = (props: Props) => (
    <Wrapper>
        {props.children}
    </Wrapper>
);

export default Main;
export {
    Main,
    Props
};
