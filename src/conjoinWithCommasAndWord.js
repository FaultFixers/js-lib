function conjoinWithCommasAndWord(strings, word) {
    if (strings.length < 3) {
        return strings.join(` ${word} `);
    } else {
        return strings.slice(0, strings.length - 1).join(', ') + ` ${word} ` + strings[strings.length - 1];
    }
}

export default conjoinWithCommasAndWord;
