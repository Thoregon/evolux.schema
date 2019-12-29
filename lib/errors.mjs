/**
 * defines all errors used in dyncomponents
 *
 * @author: blukassen
 */
import { EError } from '/evolux.supervise';

export const ErrUnknownSchema           = (msg)         => new EError(`Unknown Schema: ${msg}`, "SCHEMA:00001");

