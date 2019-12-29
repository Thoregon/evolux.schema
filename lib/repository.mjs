/**
 * Repository for schemas.
 * Provides a registry and query features
 *
 * This repository is not strict, doesn't throw errors on queries
 *
 * @author: Bernhard Lukassen
 */

import { EventEmitter}              from "/evolux.pubsub";
import { Reporter }                 from "/evolux.supervise";

export default class Repository extends Reporter(EventEmitter) {

    constructor() {
        super(...arguments);
        this._schemas = new Map();
    }

    hasSchema(id) {
        return this._schemas.has(id);
    }

    schema(id) {
        return this._schemas.get(id);
    }

    putSchema(id, schema) {
        const exists = this.hasSchema(id);
        this._schemas.set(id, schema);
        this.emit(exists ? 'update' : 'put', { id, schema });
    }

    dropSchema(id) {
        const schema = this.schema(id);
        if (!schema) return;
        this._schemas.delete(id);
        this.emit('drop', { id, schema });
    }

    get schemas() {
        return this._schemas.values();
    }

    get attributes() {

    }

    get methods() {

    }

    get indexes() {

    }

    get references() {

    }

    /*
     * EventEmitter implementation
     */

    get publishes() {
        return {
            ready:          'Schema Repository ready',
            exit:           'Schema Repository exit',
            put:            'Schema putted',
            drop:           'Schema dropped',
            update:         'Schema updated'
        };
    }

    /*
     * lifecycle
     */

    init() {
        this.emit('ready');
    }

    exit() {
        this._schemas.clear();
        this.emit('exit');
    }
}
