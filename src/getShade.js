import Values from 'values.js';

export default function getShade(original, percent) {
    const shaded = new Values(original).shade(percent).hex;
    return `#${shaded}`;
}

