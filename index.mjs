/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { myuniverse, tservices } from '/evolux.universe';
import Repository               from "./lib/repository.mjs";
import SchemaBuilder            from "./lib/schemabuilder.mjs";

export *                        from './lib/types/types.mjs';
export default SchemaBuilder;

export const service = {
    install() {
        myuniverse().logger.debug('** schema install()');
        tservices().schema = new Repository();
    },

    uninstall() {
        myuniverse().logger.debug('** schema uninstall()');
        // delete tservices().;
    },

    resolve() {
        myuniverse().logger.debug('** schema resolve()');
        // nothing to do
    },

    start() {
        myuniverse().logger.debug('** schema start()');
        tservices().schema.init();
    },

    stop() {
        myuniverse().logger.debug('** schema stop()');
        tservices().schema.exit();
    },

    update() {
        myuniverse().logger.debug('** schema update()');
    }
};
