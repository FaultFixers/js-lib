/**
 * Recursively converts fields to a format that can be sent to the API.
 *
 * Converts LocalDate objects to strings.
 * Converts LocalTime objects to strings.
 * Converts image objects to IDs.
 */
function transformFormFieldsForSaving(fields) {
    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        switch (field.type) {
            case 'CHECKBOX':
                field.value = !!field.value;
                break;
            case 'DATE':
                if (field.value) {
                    // Convert LocalDate objects to strings.
                    field.value = field.value.toString();
                }
                break;
            case 'DATE_TIME':
                if (field.date) {
                    // Convert LocalDate objects to strings.
                    field.date = field.date.toString();
                }
                if (field.time) {
                    // Convert LocalTime objects to strings.
                    field.time = field.time.toString();
                }
                break;
            case 'FIELDSET':
                if (field.instances) {
                    field.instances = transformFormFieldsForSaving(field.instances);
                } else {
                    field.instances = [];
                }
                break;
            case 'FIELDSET_INSTANCE':
                field.fields = transformFormFieldsForSaving(field.fields);
                break;
            case 'IMAGES':
                if (field.images) {
                    field.images = field.images.map(image => image.id);
                } else {
                    field.images = [];
                }
                break;
            case 'TIME':
                if (field.value) {
                    // Convert LocalTime objects to strings.
                    field.value = field.value.toString();
                }
                break;
            case 'TEXT':
            case 'DROPDOWN':
            case 'HELP_TEXT':
            case 'SIGNATURE':
                break;
            default:
                throw new Error('Unexpected field type: ' + field.type);
        }
    }
    return fields;
}

export default transformFormFieldsForSaving;
