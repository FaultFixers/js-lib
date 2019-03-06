import {LocalDate, LocalTime} from 'local-date-time';

function fillInFormFieldDefaults(fields) {
    const copy = JSON.parse(JSON.stringify(fields));

    for (let i = 0; i < copy.length; i++) {
        const field = copy[i];

        switch (field.type) {
            case 'CHECKBOX':
                field.value = !!field.defaultValue;
                break;
            case 'DATE':
                field.value = field.defaultToToday ? LocalDate.today().toString() : null;
                break;
            case 'DATE_TIME':
                if (field.defaultToNow) {
                    field.date = LocalDate.today().toString();
                    field.time = LocalTime.now().toString();
                }
                break;
            case 'FIELDSET':
                if (field.required) {
                    field.instances = [
                        {
                            type: 'FIELDSET_INSTANCE',
                            label: field.defaultLabel,
                            fields: fillInFormFieldDefaults(field.fields),
                        },
                    ];
                } else {
                    field.instances = [];
                }
                break;
            case 'FIELDSET_INSTANCE':
                field.fields = fillInFormFieldDefaults(field.fields);
                break;
            case 'TEXT':
                field.value = field.defaultValue ? field.defaultValue : null;
                break;
            case 'TIME':
                field.value = field.defaultToNow ? LocalTime.now().toString() : null;
                break;
            case 'IMAGES':
                field.images = [];
                break;
            case 'DROPDOWN':
            case 'HELP_TEXT':
            case 'SIGNATURE':
                break;
            default:
                throw new Error('Unexpected field type: ' + field.type);
        }
    }

    return copy;
}

export default fillInFormFieldDefaults;
