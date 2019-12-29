/**
 *
 *
 * @author: Bernhard Lukassen
 */

import { isFunction, useprops } from '/evolux.util';
import has                      from '/has-values';
import is                       from '/@sindresorhus/is';
import { myevolux }             from '/evolux.universe';
import Schema                   from './schema/schema.mjs';
import { ErrUnknownSchema }     from './errors.mjs';
import Attribute                from './schema/attribute.mjs';
import Index                    from "./schema/index.mjs";

export default class SchemaBuilder {

    constructor() {
        this._attributes =  [];
        this._methods =     [];
        this._indexes =     [];
    }

    name(name) {
        this._name = name;
        return this;
    }

    extend(schemaname) {
        this._extend = schemaname;
        return this;
    }

    addAttribute(attribute) {
        this._attributes.push(attribute);
        return this;
    }

    addMethod(method) {
        this._methods.push(method);
        return this;
    }

    addIndex(index) {
        this._indexes.push(index);
        return this;
    }

    /*
     * build and register the schema
     */

    build() {
        let schema;
        if (this._extend) {
            if (!myevolux().schema.hasSchema(this._extend)) throw ErrUnknownSchema(this._extend);
            schema = new Schema({ name: this._name, extend: myevolux().schema.schema(this._extend) });
            myevolux().schema.put(this._name, schema);
        } else {
            // if it exists, supplement it
            // if not, create new schema
            if (!!myevolux().schema.hasSchema(this._name)) {
                schema = new Schema({ name: this._name });
                myevolux().schema.putSchema(this._name, schema);
            } else {
                schema = myevolux().schema.get(this._name);
            }
        }

        // now set all attributes, methods, ...
        // todo: record changes for existing schemas
        let oldattr = Object.keys(schema.attributes);
        this._attributes.forEach(attrdef => {
            let attrname = attrdef.name;
            if (attrdef.index) this._indexes.push({ attr: attrname, order: 'asc' });
            let attr = new Attribute( useprops(attrdef, 'name', 'description', 'group', 'tags', 'type', 'mandatory'));
            if (attrdef.compute) {
                attr.compute = (isFunction(attrdef.compute))
                    ? { fn: attrdef.compute }
                    : attrdef.compute;
            }
            if (attrdef.validate) {
                attr.validate = (isFunction(attrdef.validate))
                    ? { fn: attrdef.validate }
                    : attrdef.validate;
            }
            schema.attibutes[attrname] = attr;

            oldattr = oldattr.filter(item => item != attrname);
        });
        // remove old attributes
        oldattr.forEach(attrname => delete schema.attributes[attrname]);

        // define indexes
        // todo: record changes for existing schemas
        schema.indexes = [];
        this._indexes.forEach(idxdef => {
            let idxattrs = [];
            let attrs = idxdef.attr;
            if (is.array(attrs)) {
                idxattrs = attrs;
            } else {
                idxattrs = [attrs];
            }
            let index = new Index({ attrs: idxattrs, order: idxdef.order || 'asc'});
        });

        // define mthods
        this.__methods.forEach(mthdef => {

        });

        return schema;
    }


}

const
