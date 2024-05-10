const escapeHtml = require("escape-html");

module.exports = async (req, res, next) => {
    // Escape HTML in query parameters
    if (req.query) {
        for (let key in req.query) {
            req.query[key] = escapeHtml(req.query[key]);
        }
    }

    // Escape HTML in request body parameters
    if (req.body) {
        for (let key in req.body) {
            req.body[key] = escapeHtml(req.body[key]);
        }
    }

    // Escape HTML in request params
    if (req.params) {
        for (let key in req.params) {
            req.params[key] = escapeHtml(req.params[key]);
        }
    }

    // Escape HTML in cookies
    if (req.cookies) {
        for (let key in req.cookies) {
            req.cookies[key] = escapeHtml(req.cookies[key]);
        }
    }

    // Escape HTML in request headers
    if (req.headers) {
        for (let key in req.headers) {
            req.headers[key] = escapeHtml(req.headers[key]);
        }
    }

    next();
};
