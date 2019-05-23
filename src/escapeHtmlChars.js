const HTML_ESCAPES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '`': '&#96;',
};

function escapeHtmlChars(string) {
    if (typeof string !== 'string') {
        return null;
    }

    for (let key in HTML_ESCAPES) {
        string = string.replace(new RegExp(key, 'g'), HTML_ESCAPES[key]);
    }
    return string;
}

export default escapeHtmlChars;
