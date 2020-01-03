/**
 *
 *
 * @author: Bernhard Lukassen
 */

export class Type {

    constructor({
                    id,
                    name,
                    description,
                    format,
                    basedon
                } = {}) {
        Object.assign(this, { id, name, description, format, basedon });
    }

}

export class ContainerType extends Type {

    constructor({
                    id,
                    name,
                    description,
                    content,
                    basedon,
                    reference
                } = {}) {
        super({ id, name, description, basedon, reference });
        Object.assign(this, { content });
    }

}

/*
 * Reference types
 */
export const ID =       new Type({ id: 'ID', name: 'id', description: 'Internal unique ID' });
export const CHILD =    type => new Type({ id: 'CHILD', name: 'child', description: 'embedded child entity', type: type });
export const REL =      type => new Type({ id: 'REF', name: 'ref', description: 'reference (by id) to another entity', type: type });

/*
 * Basic types
 */
export const INT =      new Type({ id: 'INT', name: 'Integer', format: '#,##0' });
export const REAL =     new Type({ id: 'REAL', name: 'Floating point number', format: '#,##0.00' });
export const BOOL =     new Type({ id: 'BOOL', name: 'Boolean' });
export const STRING =   new Type({ id: 'STRING', name: 'String' });
export const DATE =     new Type({ id: 'DATE', name: 'Date', format: 'yyyy-mm-dd HH:MM:SS' });
export const DATETIME = new Type({ id: 'DATETIME', name: 'Date & Time', format: 'yyyy-mm-dd HH:MM:SS' });
export const DURATION = new Type({ id: 'DURATION', name: 'Duration' });     // todo: define default format
export const IMAGE =    new Type({ id: 'IMAGE', name: 'Image' });

/*
 * Container types
 */
export const LIST =     content         => new ContainerType({ id: 'LIST', name: 'List', content });
export const MAP =      (content, key)  => new ContainerType({ id: 'MAP', name: 'Map', content, key: key ? key : '_id' });  // use the _id of the entity if not specified
export const SET =      content         => new ContainerType({ id: 'SET', name: 'Set', content });
