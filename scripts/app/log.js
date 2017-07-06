import * as dom from 'app/dom.js';

const logger = dom.getElementById('logger');

const LogType = {
  debug : 'log-type-debug'
, info  : 'log-type-info'
, warn  : 'log-type-warn'
, error : 'log-type-error'
};

const putMessage = (type, ...args) => {
  const message = `<div class="${type}">${args.join(' ')}</div>`;
  if (logger.children.length > 20) {
    logger.innerHTML = message;
  } else {
    logger.innerHTML += message;
  }
}

export const debug  = (...args) => putMessage(LogType.debug, ...args);
export const info   = (...args) => putMessage(LogType.info, ...args);
export const warn   = (...args) => putMessage(LogType.warn, ...args);
export const error  = (...args) => putMessage(LogType.error, ...args);

debug("test debug", 1, 2);
info("test info", 1, 2);
warn("test warn", 1, 2);
error("test error", 1, 2);
