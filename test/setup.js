import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// Helpers.
import { createDom } from './helpers';

const { window } = createDom();

// Client globals.
global.document = window.document;
global.navigator = { userAgent: 'node.js', appName: 'Netscape' };
global.window = window;
