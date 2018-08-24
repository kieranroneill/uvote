import { Action, History, Location, LocationState, UnregisterCallback } from 'history';
import { match, RouteComponentProps, RouterProps, StaticContext } from 'react-router';

export class MockLocation implements Location {
    public hash: string;
    public key: string;
    public pathname: string;
    public search: string;
    public state: LocationState;

    constructor(pathname?: string) {
        this.hash = '';
        this.key = '';
        this.pathname = pathname || '/';
        this.search = '';
        this.state = {};
    }
}

export class MockHistory implements History {
    public action: Action;
    public block: () => UnregisterCallback;
    public createHref: () => string;
    public go: () => void;
    public goBack: () => void;
    public goForward: () => void;
    public length: number;
    public listen: () => UnregisterCallback;
    public location: Location;
    public push: () => void;
    public replace: () => void;

    constructor(pathname?: string, location?: Location) {
        this.action = 'POP';
        this.block = jest.fn();
        this.createHref = jest.fn();
        this.go = jest.fn();
        this.goBack = jest.fn();
        this.goForward = jest.fn();
        this.length = 2;
        this.listen = jest.fn();
        this.location = location || new MockLocation(pathname);
        this.push = jest.fn();
        this.replace = jest.fn();
    }
}

export class MockRouterProps implements RouterProps {
    public history: History;

    constructor() {
        this.history = new MockHistory();
    }
}

export class MockRouteComponentProps implements RouteComponentProps<any> {
    public history: History;
    public location: Location;
    public match: match<any>;
    public staticContext: StaticContext;

    constructor(pathname?: string) {
        const location: Location = new MockLocation(pathname);

        this.history = new MockHistory(pathname, location);
        this.location = location;
        this.match = {
            isExact: true,
            params: {},
            path: pathname || '/',
            url: pathname || '/',
        };
        this.staticContext = {};
    }
}
