import { createElement } from 'react';
import { render } from 'react-dom';

// Components.
import { App } from './App';

export async function onDOMContentLoaded() {
    const element: HTMLElement | null = document.getElementById('root');

    if (element) {
        render(createElement(App), element);
    }
}

window.addEventListener('DOMContentLoaded', onDOMContentLoaded);
