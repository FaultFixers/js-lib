const chai = require('chai');
const expect = chai.expect;
const {LocalDate, LocalTime} = require('local-date-time');
const method = require('../dist/test-bundle.js').transformFormFieldsForSaving;

function expectNoChange(input) {
    expectResult(input, input);
}

function expectResult(input, expected) {
    expect(JSON.stringify(method(input)))
        .to.deep.equal(JSON.stringify(expected));
}

describe('transformFormFieldsForSaving', function() {
    it('for a CHECKBOX field', function() {
        const fields = [
            {type: 'CHECKBOX'},
            {type: 'CHECKBOX', value: false},
            {type: 'CHECKBOX', value: true},
        ];

        expectResult(fields, [
            {type: 'CHECKBOX', value: false},
            {type: 'CHECKBOX', value: false},
            {type: 'CHECKBOX', value: true},
        ]);
    });

    it('for a DATE field', function() {
        const fields = [
            {type: 'DATE', value: LocalDate.of('2019-05-23')},
            {type: 'DATE'},
        ];

        expectResult(fields, [
            {type: 'DATE', value: '2019-05-23'},
            {type: 'DATE'},
        ]);
    });

    it('for a DATE_TIME field', function() {
        const fields = [
            {type: 'DATE_TIME', date: LocalDate.of('2019-05-23'), time: LocalTime.of('12:15')},
            {type: 'DATE_TIME', date: LocalDate.of('2019-05-23')},
            {type: 'DATE_TIME', time: LocalTime.of('12:15')},
            {type: 'DATE_TIME'},
        ];

        expectResult(fields, [
            {type: 'DATE_TIME', date: '2019-05-23', time: '12:15'},
            {type: 'DATE_TIME', date: '2019-05-23'},
            {type: 'DATE_TIME', time: '12:15'},
            {type: 'DATE_TIME'},
        ]);
    });

    it('for a DROPDOWN field', function() {
        const fields = [
            {type: 'DROPDOWN', value: 'Apple'},
        ];

        expectNoChange(fields);
    });

    it('for a FIELDSET field', function() {
        const fields = [
            {
                type: 'FIELDSET',
                defaultLabel: 'Bedroom',
                required: false,
                fields: [
                    {type: 'CHECKBOX'},
                ],
                instances: [
                    {
                        type: 'FIELDSET_INSTANCE',
                        label: 'Bedroom',
                        fields: [
                            {type: 'CHECKBOX'},
                        ],
                    },
                ],
            },
        ];

        expectResult(fields, [
            {
                type: 'FIELDSET',
                defaultLabel: 'Bedroom',
                required: false,
                fields: [
                    {type: 'CHECKBOX'},
                ],
                instances: [
                    {
                        type: 'FIELDSET_INSTANCE',
                        label: 'Bedroom',
                        fields: [
                            {type: 'CHECKBOX', value: false},
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
                fields: [
                    {type: 'TEXT'},
                    {type: 'IMAGES', images: [{id: 'aaaaaaaaaaaaaaaaaaaaaaaa', untouchedUrl: 'file.jpg'}]},
                ],
            },
        ];

        expectResult(fields, [
            {
                type: 'FIELDSET_INSTANCE',
                label: 'Bedroom 1',
                fields: [
                    {type: 'TEXT'},
                    {type: 'IMAGES', images: ['aaaaaaaaaaaaaaaaaaaaaaaa']},
                ],
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
            {type: 'IMAGES', images: []},
            {type: 'IMAGES', images: [
                {id: 'aaaaaaaaaaaaaaaaaaaaaaaa', untouchedUrl: 'file.jpg'},
                {id: 'bbbbbbbbbbbbbbbbbbbbbbbb', untouchedUrl: 'file.jpg'},
            ]},
        ];

        expectResult(fields, [
            {
                type: 'IMAGES',
                images: [],
            },
            {
                type: 'IMAGES',
                images: [],
            },
            {
                type: 'IMAGES',
                images: ['aaaaaaaaaaaaaaaaaaaaaaaa', 'bbbbbbbbbbbbbbbbbbbbbbbb'],
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
            {type: 'TEXT', value: 'Some text'},
            {type: 'TEXT'},
        ];

        expectNoChange(fields);
    });

    it('for a TIME field', function() {
        const fields = [
            {type: 'TIME', value: LocalTime.of('21:15')},
            {type: 'TIME'},
        ];

        expectResult(fields, [
            {type: 'TIME', value: '21:15'},
            {type: 'TIME'},
        ]);
    });

    it('should throw when given an unsupported type', function() {
        const fields = [
            {type: 'SOMETHING_UNEXPECTED'},
        ];

        expect(() => method(fields)).to.throw('Unexpected field type: SOMETHING_UNEXPECTED');
    });
});
