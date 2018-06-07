const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').getAvailableCommentVisibilities;

describe('getAvailableCommentVisibilities', function() {
    it('if should return correct visibilities', function() {
        expect(method(['UPDATE_TICKETS_PUBLIC_COMMENT']))
            .to.deep.equal(['PUBLIC']);

        expect(method(['UPDATE_TICKETS_PRIVATE_TO_REPORTER_COMMENT']))
            .to.deep.equal(['PRIVATE_TO_REPORTER']);

        expect(method(['UPDATE_TICKETS_INTERNAL_TO_TEAM_COMMENT']))
            .to.deep.equal(['INTERNAL_TO_TEAM']);

        expect(method(['UPDATE_TICKETS_PUBLIC_COMMENT', 'UPDATE_TICKETS_PRIVATE_TO_REPORTER_COMMENT', 'UPDATE_TICKETS_INTERNAL_TO_TEAM_COMMENT']))
            .to.deep.equal(['PUBLIC', 'PRIVATE_TO_REPORTER', 'INTERNAL_TO_TEAM']);
    });
});
