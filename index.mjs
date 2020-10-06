/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { tservices }            from '/evolux.universe';
import Repository               from "./lib/repository.mjs";
import SchemaBuilder            from "./lib/schemabuilder.mjs";

export *                        from './lib/types/types.mjs';
export default SchemaBuilder;

export const service = {
    install() {
        universe.logger.debug('** schema install()');
        tservices().schema = new Repository();
    },

    uninstall() {
        universe.logger.debug('** schema uninstall()');
        // delete tservices().;
    },

    resolve() {
        universe.logger.debug('** schema resolve()');
        // nothing to do
    },

    start() {
        universe.logger.debug('** schema start()');
        tservices().schema.init();
    },

    stop() {
        universe.logger.debug('** schema stop()');
        tservices().schema.exit();
    },

    update() {
        universe.logger.debug('** schema update()');
    }
};
