/**
 * Recursively validations form fields.
 *
 * Throws an error if validation fails.
 */
function validateFormFields(fields) {
    if (!(fields instanceof Array)) {
        throw new Error('Fields must be an array, got: ' + fields);
    }

    for (let i = 0; i < fields.length; i++) {
        const field = fields[i];
        switch (field.type) {
            case 'CHECKBOX':
                // There is no applicable validation.
                break;
            case 'DATE':
                if (field.required && !field.value) {
                    if (field.label) {
                        throw new Error(`"${field.label}" has not been completed - please check the form again.`);
                    } else {
                        throw new Error('A date field has not been completed - please check the form again.');
                    }
                }
                break;
            case 'DATE_TIME':
                if (field.required && (!field.date || !field.time)) {
                    if (field.label) {
                        throw new Error(`"${field.label}" has not been completed - please check the form again.`);
                    } else {
                        throw new Error('A date/time field has not been completed - please check the form again.');
                    }
                }
                break;
            case 'FIELDSET':
                if (field.required && (!field.instances || field.instances.length === 0)) {
                    if (field.defaultLabel) {
                        throw new Error(`"${field.defaultLabel}" has not been completed - please check the form again.`);
                    } else {
                        throw new Error(`A section has not been completed - please check the form again.`);
                    }
                }
                if (field.instances) {
                    validateFormFields(field.instances);
                }
                break;
            case 'FIELDSET_INSTANCE':
                if (field.fields) {
                    validateFormFields(field.fields);
                }
                break;
            case 'IMAGES':
                if (field.required && (!field.images || field.images.length === 0)) {
                    if (field.label) {
                        throw new Error(`"${field.label}" has not been completed - please check the form again.`);
                    } else {
                        throw new Error('A photo field has not been completed - please check the form again.');
                    }
                }
                break;
            case 'TEXT':
                if (field.required && !field.value) {
                    if (field.label) {
                        throw new Error(`"${field.label}" has not been completed - please check the form again.`);
                    } else {
                        throw new Error('A text field has not been completed - please check the form again.');
                    }
                }
                break;
            case 'TIME':
                if (field.required && !field.value) {
                    if (field.label) {
                        throw new Error(`"${field.label}" has not been completed - please check the form again.`);
                    } else {
                        throw new Error('A time field has not been completed - please check the form again.');
                    }
                }
                break;
            case 'DROPDOWN':
                if (field.required && (field.value === null || field.value === undefined || field.value === '')) {
                    if (field.label) {
                        throw new Error(`"${field.label}" has not been completed - please check the form again.`);
                    } else {
                        throw new Error('A multi-choice field has not been completed - please check the form again.');
                    }
                }
                break;
            case 'HELP_TEXT':
                // There is no applicable validation.
                break;
            case 'SIGNATURE':
                if (field.required && !field.base64Image) {
                    if (field.label) {
                        throw new Error(`"${field.label}" has not been completed - please check the form again.`);
                    } else {
                        throw new Error('A signature is missing - please check the form again.');
                    }
                }
                break;
            default:
                throw new Error('Unexpected field type: ' + field.type);
        }
    }
}

export default validateFormFields;
