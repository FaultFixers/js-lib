const HTML_ESCAPES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '`': '&#96;',
};

function paragraphs(text) {
    if (typeof text !== 'string') {
        return '';
    }

    let altered = text.trim();
    if (altered === '') {
        return '';
    }

    for (let key in HTML_ESCAPES) {
        altered = altered.replace(new RegExp(key, 'g'), HTML_ESCAPES[key]);
    }
    altered = `<p>${altered}</p>`;
    altered = altered.replace(/\n{2,}/g, '</p><p>');
    altered = altered.replace(/\n/g, '<br />');
    altered = altered.replace(/<\/p>/g, '</p>\n');
    altered = altered.replace(/<br \/>/g, '<br />\n');
    altered = altered.trim();
    return altered;
}

export default paragraphs;
