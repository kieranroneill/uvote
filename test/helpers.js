import { JSDOM } from 'jsdom';

/**
 * Creates a JSDOM object.
 * @returns {JSDOM} a mocked DOM object.
 */
export function createDom() {
    return new JSDOM(`
        <!DOCTYPE html>
        <html>
            <body>
                <div id="root"></div>
            </body>
        </html>
    `);
}
