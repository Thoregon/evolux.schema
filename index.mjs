/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { myevolux }     from '/evolux.universe';

export const service = {
    install() {
        console.log('** schema install()');
        // myevolux(). = new ();
    },

    uninstall() {
        console.log('** schema uninstall()');
        // delete myevolux().;
    },

    resolve() {
        console.log('** schema resolve()');
        // nothing to do
    },

    start() {
        console.log('** schema start()');
        // myevolux().matter;
    },

    stop() {
        console.log('** schema stop()');
        // myevolux().matter;
    },

    update() {
        console.log('** schema update()');
    }
};
