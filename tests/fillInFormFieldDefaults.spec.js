const chai = require('chai');
const expect = chai.expect;
const {LocalDate, LocalTime} = require('local-date-time');
const method = require('../dist/test-bundle.js').fillInFormFieldDefaults;

function expectNoChange(input) {
    expectResult(input, input);
}

function expectResult(input, expected) {
    expect(JSON.stringify(method(input)))
        .to.deep.equal(JSON.stringify(expected));
}

describe('fillInFormFieldDefaults', function() {
    it('for a CHECKBOX field', function() {
        const fields = [
            {type: 'CHECKBOX', defaultValue: false},
            {type: 'CHECKBOX', defaultValue: true},
        ];

        expectResult(fields, [
            {type: 'CHECKBOX', defaultValue: false, value: false},
            {type: 'CHECKBOX', defaultValue: true, value: true},
        ]);
    });

    it('for a DATE field', function() {
        const fields = [
            {type: 'DATE', defaultToToday: false},
            {type: 'DATE', defaultToToday: true},
        ];

        expectResult(fields, [
            {type: 'DATE', defaultToToday: false, value: null},
            {type: 'DATE', defaultToToday: true, value: LocalDate.today()},
        ]);
    });

    it('for a DATE_TIME field', function() {
        const fields = [
            {type: 'DATE_TIME', defaultToNow: false},
            {type: 'DATE_TIME', defaultToNow: true},
        ];

        expectResult(fields, [
            {type: 'DATE_TIME', defaultToNow: false},
            {type: 'DATE_TIME', defaultToNow: true, date: LocalDate.today(), time: LocalTime.now()},
        ]);
    });

    it('for a DROPDOWN field', function() {
        const options = ['Apple', 'Banana', 'Carrot'];

        const fields = [
            {type: 'DROPDOWN', required: false, options: options},
            {type: 'DROPDOWN', required: true, options: options},
        ];

        expectNoChange(fields);
    });

    it('for a FIELDSET field', function() {
        const fields = [
            {
                type: 'FIELDSET',
                defaultLabel: 'Front garden',
                required: false,
                fields: [
                    {type: 'TEXT', defaultValue: 'No issues'},
                ],
            },
            {
                type: 'FIELDSET',
                defaultLabel: 'Bedroom',
                required: true,
                fields: [
                    {type: 'TEXT', defaultValue: 'No issues'},
                    {type: 'CHECKBOX', defaultValue: true},
                ],
            },
        ];

        expectResult(fields, [
            {
                type: 'FIELDSET',
                defaultLabel: 'Front garden',
                required: false,
                fields: [
                    {type: 'TEXT', defaultValue: 'No issues'},
                ],
                instances: [],
            },
            {
                type: 'FIELDSET',
                defaultLabel: 'Bedroom',
                required: true,
                fields: [
                    {type: 'TEXT', defaultValue: 'No issues'},
                    {type: 'CHECKBOX', defaultValue: true},
                ],
                instances: [
                    {
                        type: 'FIELDSET_INSTANCE',
                        label: 'Bedroom',
                        fields: [
                            {type: 'TEXT', defaultValue: 'No issues', value: 'No issues'},
                            {type: 'CHECKBOX', defaultValue: true, value: true},
                        ],
                    },
                ],
            },
        ]);
    });

    it('for a FIELDSET_INSTANCE field', function() {
        const fields = [
            {
                type: 'FIELDSET_INSTANCE',
                label: 'Bedroom 1',
                fields: [{type: 'TEXT', defaultValue: 'No issues'}, {type: 'CHECKBOX', defaultValue: true}]
            },
            {
                type: 'FIELDSET_INSTANCE',
                label: 'Bedroom 1',
                fields: [{type: 'TEXT'}, {type: 'CHECKBOX'}]
            },
        ];

        expectResult(fields, [
            {
                type: 'FIELDSET_INSTANCE',
                label: 'Bedroom 1',
                fields: [{type: 'TEXT', defaultValue: 'No issues', value: 'No issues'}, {type: 'CHECKBOX', defaultValue: true, value: true}]
            },
            {
                type: 'FIELDSET_INSTANCE',
                label: 'Bedroom 1',
                fields: [{type: 'TEXT', value: null}, {type: 'CHECKBOX', value: false}]
            },
        ]);
    });

    it('for a HELP_TEXT field', function() {
        const fields = [
            {type: 'HELP_TEXT', text: 'Some help text'},
        ];

        expectNoChange(fields);
    });

    it('for an IMAGES field', function() {
        const fields = [
            {type: 'IMAGES'},
        ];

        expectResult(fields, [
            {
                type: 'IMAGES',
                images: []
            },
        ]);
    });

    it('for a SIGNATURE field', function() {
        const fields = [
            {type: 'SIGNATURE'},
        ];

        expectNoChange(fields);
    });

    it('for a TEXT field', function() {
        const fields = [
            {type: 'TEXT'},
            {type: 'TEXT', defaultValue: 'Some text'},
        ];

        expectResult(fields, [
            {type: 'TEXT', value: null},
            {type: 'TEXT', defaultValue: 'Some text', value: 'Some text'},
        ]);
    });

    it('for a TIME field', function() {
        const fields = [
            {type: 'TIME', defaultToNow: false},
            {type: 'TIME', defaultToNow: true},
        ];

        expectResult(fields, [
            {type: 'TIME', defaultToNow: false, value: null},
            {type: 'TIME', defaultToNow: true, value: LocalTime.now()},
        ]);
    });

    it('should throw when given an unsupported type', function() {
        const fields = [
            {type: 'SOMETHING_UNEXPECTED'},
        ];

        expect(() => method(fields)).to.throw('Unexpected field type: SOMETHING_UNEXPECTED');
    });
});
