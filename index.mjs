/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { myevolux }     from '/evolux.universe';
import Repository       from "./lib/repository.mjs";

export *                from './lib/types/types.mjs';

export const service = {
    install() {
        console.log('** schema install()');
        myevolux().schema = new Repository();
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
        myevolux().schema.init();
    },

    stop() {
        console.log('** schema stop()');
        myevolux().schema.exit();
    },

    update() {
        console.log('** schema update()');
    }
};
