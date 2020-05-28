/**
 * defines all errors used in dyncomponents
 *
 * @author: blukassen
 */
import { EError } from '/evolux.supervise';

export const ErrUnknownSchema           = (msg)         => new EError(`Unknown Schema: ${msg}`,                 "SCHEMA:00001");
export const ErrObject4SchemaMissing    = (msg)         => new EError(`Object missing for Schema: ${msg}`,      "SCHEMA:00002");


