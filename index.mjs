/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { myuniverse, myevolux } from '/evolux.universe';
import Repository               from "./lib/repository.mjs";
import SchemaBuilder            from "./lib/schemabuilder.mjs";

export *                        from './lib/types/types.mjs';
export default SchemaBuilder;

export const service = {
    install() {
        myuniverse().logger.debug('** schema install()');
        myevolux().schema = new Repository();
    },

    uninstall() {
        myuniverse().logger.debug('** schema uninstall()');
        // delete myevolux().;
    },

    resolve() {
        myuniverse().logger.debug('** schema resolve()');
        // nothing to do
    },

    start() {
        myuniverse().logger.debug('** schema start()');
        myevolux().schema.init();
    },

    stop() {
        myuniverse().logger.debug('** schema stop()');
        myevolux().schema.exit();
    },

    update() {
        myuniverse().logger.debug('** schema update()');
    }
};
