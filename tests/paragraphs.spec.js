const chai = require('chai');
const expect = chai.expect;

const paragraphs = require('../dist/test-bundle.js').paragraphs;

describe('paragraphs', function() {
    function expectResult(input, output) {
        expect(paragraphs(input)).to.equal(output);
    }

    it('should wrap text in a paragraph', function() {
        expectResult('word', '<p>word</p>');
    });

    it('should trim the string of whitespace at the start/end', function() {
        expectResult('\n \n  \t word  \n\t \n', '<p>word</p>');
    });

    it('should replace single line breaks with <br />', function() {
        expectResult('first\nsecond', '<p>first<br />\nsecond</p>');
    });

    it('should replace multiple consecutive line breaks with paragraphs', function() {
        expectResult('first\n\n\n\nsecond', '<p>first</p>\n<p>second</p>');
    });

    it('should handle complicated cases', function() {
        expectResult('first\n\n\n\nsecond\nthird\n\nfourth\n', '<p>first</p>\n<p>second<br />\nthird</p>\n<p>fourth</p>');
    });

    it('should return an empty value if given a non-string', function() {
        expectResult(null, '');
        expectResult(false, '');
        expectResult(1, '');
        expectResult(undefined, '');
    });

    it('should return an empty value if given an empty string', function() {
        expectResult('', '');
    });

    it('should escape existing HTML to prevent XSS attacks', function() {
        expectResult('word\n<script> </script> &', '<p>word<br />\n&lt;script&gt; &lt;/script&gt; &amp;</p>');
    });
});
