function toTitleCase(text) {
    if (text === null || text === undefined) {
        return null;
    }

    if (typeof text !== 'string') {
        throw new Error('Given a non-string: ' + text);
    }

    return text.replace(/^[a-z]/g, t => t.toUpperCase()).replace(/ [a-z]/g, t => t.toUpperCase());
}

export default toTitleCase;
