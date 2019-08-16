'use strict';

class ControlException {
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
}

module.exports = ControlException;