import * as React from 'react';
import {
    RouteComponentProps,
    withRouter,
} from 'react-router-dom';
import styled from 'styled-components';

// Config.
import {
    Routes,
    Titles,
} from '../../config/routes';

// Components.
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from '@material-ui/icons/People';

const ChildContainer = styled.main`
  display: flex;
  flex-direction: row;
  flex: 1;
  position: relative;
`;

interface Props extends RouteComponentProps<{}> {
    children: React.ReactNode;
}

class Main extends React.PureComponent<Props> {
    constructor(props: Props) {
        super(props);

        // Bind functions.
        this.onBottomNavigationChange = this.onBottomNavigationChange.bind(this);
    }

    onBottomNavigationChange(event: React.ChangeEvent<{}>, value: string): void {
        return this.props.history.push(value);
    }

    render(): React.ReactNode {
        const {
            children,
            history,
        } = this.props;

        return (
            <>
                <ChildContainer>
                    {children}
                </ChildContainer>
                <BottomNavigation
                    value={history.location.pathname}
                    onChange={this.onBottomNavigationChange}
                    showLabels>
                    <BottomNavigationAction
                        icon={<PeopleIcon />}
                        label={Titles.Candidates}
                        value={Routes.Candidates}
                    />
                    <BottomNavigationAction
                        icon={<EqualizerIcon />}
                        label={Titles.Results}
                        value={Routes.Results}
                    />
                </BottomNavigation>
            </>
        );
    }
}

export default withRouter(Main);
export {
    Main,
    Props
};
