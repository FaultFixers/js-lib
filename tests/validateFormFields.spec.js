const chai = require('chai');
const expect = chai.expect;
const validateFormFields = require('../dist/test-bundle.js').validateFormFields;

function expectNoError(input) {
    expect(() => validateFormFields([input])).not.to.throw();
}

function expectError(input, expectedError) {
    if (!expectedError) {
        throw new Error('expectedError must be given');
    }

    expect(() => validateFormFields([input])).to.throw(expectedError);
}

describe('validateFormFields()', function() {
    it('for a CHECKBOX field', function() {
        expectNoError({type: 'CHECKBOX'});
        expectNoError({type: 'CHECKBOX', value: false});
        expectNoError({type: 'CHECKBOX', value: true});
    });

    it('for a DATE field', function() {
        expectNoError({type: 'DATE', required: false});
        expectNoError({type: 'DATE', required: false, value: '2019-05-23'});
        expectNoError({type: 'DATE', required: true, value: '2019-05-23'});

        expectError(
            {type: 'DATE', required: true},
            'A date field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'DATE', required: true, value: null},
            'A date field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'DATE', required: true, value: null, label: 'Job date'},
            '"Job date" has not been completed - please check the form again.'
        );
    });

    it('for a DATE_TIME field', function() {
        expectNoError({type: 'DATE_TIME', required: false});
        expectNoError({type: 'DATE_TIME', required: false, date: '2019-05-23', time: null});
        expectNoError({type: 'DATE_TIME', required: true, date: '2019-05-23', time: '12:00'});

        expectError(
            {type: 'DATE_TIME', required: true},
            'A date/time field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'DATE_TIME', required: true, date: '2019-05-23', time: null},
            'A date/time field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'DATE_TIME', required: true, date: null, time: '12:00'},
            'A date/time field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'DATE_TIME', required: true, date: null, time: null, label: 'Job date/time'},
            '"Job date/time" has not been completed - please check the form again.'
        );
    });

    it('for a DROPDOWN field', function() {
        expectNoError({type: 'DROPDOWN', required: false});
        expectNoError({type: 'DROPDOWN', required: false, value: 'Choice A'});
        expectNoError({type: 'DROPDOWN', required: true, value: 'Choice A'});
        expectNoError({type: 'DROPDOWN', required: true, value: '0'});

        expectError(
            {type: 'DROPDOWN', required: true},
            'A multi-choice field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'DROPDOWN', required: true, value: null},
            'A multi-choice field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'DROPDOWN', required: true, value: '', label: 'Risk assessment'},
            '"Risk assessment" has not been completed - please check the form again.'
        );
    });

    it('for a FIELDSET field', function() {
        expectNoError(
            {
                type: 'FIELDSET',
                required: false,
            }
        );
        expectNoError(
            {
                type: 'FIELDSET',
                required: true,
                instances: [
                    {
                        type: 'FIELDSET_INSTANCE',
                        fields: [
                            {
                                type: 'TEXT',
                                required: true,
                                label: 'Your name',
                                value: 'Bob',
                            },
                        ],
                    }
                ],
            }
        );

        expectError(
            {
                type: 'FIELDSET',
                required: true,
                defaultLabel: 'Photos',
                instances: [],
            },
            '"Photos" has not been completed - please check the form again.'
        );
        expectError(
            {
                type: 'FIELDSET',
                required: true,
            },
            'A section has not been completed - please check the form again.'
        );
        expectError(
            {
                type: 'FIELDSET',
                required: true,
                instances: [
                    {
                        type: 'FIELDSET_INSTANCE',
                        fields: [
                            {
                                type: 'TEXT',
                                required: true,
                                label: 'Your name',
                            },
                        ],
                    }
                ],
            },
            '"Your name" has not been completed - please check the form again.'
        );
    });

    it('for a FIELDSET_INSTANCE field', function() {
        expectNoError(
            {
                type: 'FIELDSET_INSTANCE',
                fields: [
                    {
                        type: 'TEXT',
                        required: false,
                    },
                ],
            }
        );
        expectNoError(
            {
                type: 'FIELDSET_INSTANCE',
                fields: [
                    {
                        type: 'TEXT',
                        required: true,
                        label: 'Your name',
                        value: 'Bob',
                    },
                ],
            }
        );

        expectError(
            {
                type: 'FIELDSET_INSTANCE',
                fields: [
                    {
                        type: 'TEXT',
                        required: true,
                        label: 'Your name',
                    },
                ],
            },
            '"Your name" has not been completed - please check the form again.'
        );
    });

    it('for a HELP_TEXT field', function() {
        expectNoError({type: 'HELP_TEXT', text: 'Some help text'});
    });

    it('for an IMAGES field', function() {
        expectNoError({type: 'IMAGES', required: false});
        expectNoError({type: 'IMAGES', required: false});
        expectNoError({type: 'IMAGES', required: false, images: null});
        expectNoError({type: 'IMAGES', required: false, images: []});
        expectNoError({type: 'IMAGES', required: true, images: [{compressedUrl: 'example.jpg'}]});

        expectError(
            {type: 'IMAGES', required: true},
            'A photo field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'IMAGES', required: true, images: null},
            'A photo field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'IMAGES', required: true, images: []},
            'A photo field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'IMAGES', required: true, images: [], label: 'Completed photos'},
            '"Completed photos" has not been completed - please check the form again.'
        );
    });

    it('for a SIGNATURE field', function() {
        expectNoError({type: 'SIGNATURE', required: false});
        expectNoError({type: 'SIGNATURE', required: false, base64Image: 'data:image/png;base64,abcdef'});
        expectNoError({type: 'SIGNATURE', required: true, base64Image: 'data:image/png;base64,abcdef'});

        expectError(
            {type: 'SIGNATURE', required: true},
            'A signature is missing - please check the form again.'
        );
        expectError(
            {type: 'SIGNATURE', required: true, base64Image: null},
            'A signature is missing - please check the form again.'
        );
        expectError(
            {type: 'SIGNATURE', required: true, base64Image: null, label: 'Customer sign-off'},
            '"Customer sign-off" has not been completed - please check the form again.'
        );
    });

    it('for a TEXT field', function() {
        expectNoError({type: 'TEXT', required: false});
        expectNoError({type: 'TEXT', required: false, value: 'Some value'});
        expectNoError({type: 'TEXT', required: true, value: 'Some value'});

        expectError(
            {type: 'TEXT', required: true},
            'A text field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'TEXT', required: true, value: null},
            'A text field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'TEXT', required: true, value: null, label: 'Your name'},
            '"Your name" has not been completed - please check the form again.'
        );
    });

    it('for a TIME field', function() {
        expectNoError({type: 'TIME', required: false});
        expectNoError({type: 'TIME', required: false, value: '12:00'});
        expectNoError({type: 'TIME', required: true, value: '12:00'});

        expectError(
            {type: 'TIME', required: true},
            'A time field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'TIME', required: true, value: null},
            'A time field has not been completed - please check the form again.'
        );
        expectError(
            {type: 'TIME', required: true, value: null, label: 'Start time'},
            '"Start time" has not been completed - please check the form again.'
        );
    });

    it('should throw when given an unsupported type', function() {
        expectError({}, 'Unexpected field type: undefined');
        expectError({type: 'TRIANGLE'}, 'Unexpected field type: TRIANGLE');
        expect(() => validateFormFields(null)).to.throw('Fields must be an array, got: null');
        expect(() => validateFormFields(undefined)).to.throw('Fields must be an array, got: undefined');
    });
});
