const chai = require('chai');
const expect = chai.expect;

const method = require('../dist/test-bundle.js').getTicketCommentVisibilityDescription;

describe('getTicketCommentVisibilityDescription', function() {
    describe('when the visibility is PUBLIC', function() {
        it('if the ticket has a location, should say the comment is public within the location', function() {
            const ticket = {
                location: {
                    name: 'Room 4111',
                },
            };
            expect(method(ticket, 'PUBLIC')).to.equal('Public comment (visible to everyone in the location)');
        });

        it('if the ticket does not have a location, should say the comment is public within the building', function() {
            const ticket = {
                building: {
                    name: 'WeWork',
                },
            };
            expect(method(ticket, 'PUBLIC')).to.equal('Public comment (visible to everyone in the building)');
        });
    });

    describe('when the visibility is PRIVATE_TO_REPORTER', function() {
        it('if the ticket has a reporter and their name, should use the reporter\'s name', function() {
            const ticket = {
                reporter: {
                    name: 'Bob',
                },
            };
            expect(method(ticket, 'PRIVATE_TO_REPORTER')).to.equal('Private comment (visible to Bob)');
        });

        it('if the ticket has a reporter their email but no name, should use the reporter\'s email', function() {
            const ticket = {
                reporter: {
                    email: 'bob@example.test',
                },
            };
            expect(method(ticket, 'PRIVATE_TO_REPORTER')).to.equal('Private comment (visible to bob@example.test)');
        });

        it('if the reporter is not available, should not fail', function() {
            const ticket = {
            };
            expect(method(ticket, 'PRIVATE_TO_REPORTER')).to.equal('Private comment');
        });
    });

    it('should throw if given an unexpected visibility', function() {
        const ticket = {
        };
        expect(() => method(ticket, 'FOO')).to.throw('Unsupported comment visibility: FOO');
    });
});
