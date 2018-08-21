import { createElement } from 'react';
import { render } from 'react-dom';
import Web3 from 'web3';

// Components.
import { App } from './App';

type WindowWeb3 = Window & { web3: Web3 };

export async function onDOMContentLoaded() {
    const element: HTMLElement | null = document.getElementById('root');

    if (!(window as WindowWeb3).web3) {
        (window as WindowWeb3).web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    }

    if (element) {
        render(createElement(App), element);
    }
}

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);
