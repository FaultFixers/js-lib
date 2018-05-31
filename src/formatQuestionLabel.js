/**
 * Formats the question label to end in a question mark or colon.
 *
 * @return E.g. 'Ideal Appointment Time?' or 'Species:'
 */
function formatQuestionLabel(label) {
    if (!label) {
        return null;
    }

    if (label.indexOf('?') === label.length - 1) {
        return label;
    } else {
        return label + ':';
    }
}

export default formatQuestionLabel;
