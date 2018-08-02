import Values from 'values.js';

export default function getTint(original, percent) {
    const tinted = new Values(original).tint(percent).hex;
    return `#${tinted}`;
}
