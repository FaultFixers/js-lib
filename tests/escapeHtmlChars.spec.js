const chai = require('chai');
const expect = chai.expect;

const escapeHtmlChars = require('../dist/test-bundle.js').escapeHtmlChars;

describe('escapeHtmlChars()', function() {
    it('should escape HTML characters', function() {
        expect(escapeHtmlChars('Hello <b>Bob</b> <script></script> &&'))
            .to.eq('Hello &lt;b&gt;Bob&lt;/b&gt; &lt;script&gt;&lt;/script&gt; &amp;&amp;');
    });
});
