"use strict";
class Form {
    constructor(initialFields) {
        this.fields = {};
        this.fields = initialFields;
    }
    // Method to set a field's value
    setFieldValue(fieldName, value) {
        if (this.fields[fieldName]) {
            this.fields[fieldName].value = value;
            this.fields[fieldName].error = this.validateField(fieldName, value);
        }
        else {
            console.warn(`Field ${fieldName} does not exist in the form.`);
        }
    }
    // Method to get a field's value
    getFieldValue(fieldName) {
        var _a;
        return ((_a = this.fields[fieldName]) === null || _a === void 0 ? void 0 : _a.value) || "";
    }
    // Method to validate a specific field
    validateField(fieldName, value) {
        const field = this.fields[fieldName];
        if (field) {
            for (const validator of field.validators) {
                const error = validator(value);
                if (error)
                    return error;
            }
        }
        return "";
    }
    // Method to validate all fields
    validateAllFields() {
        let isValid = true;
        for (const fieldName in this.fields) {
            const field = this.fields[fieldName];
            const error = this.validateField(fieldName, field.value);
            if (error) {
                field.error = error;
                isValid = false;
            }
            else {
                field.error = "";
            }
        }
        return isValid;
    }
    // Method to get all form values
    getFormValues() {
        const values = {};
        for (const fieldName in this.fields) {
            values[fieldName] = this.fields[fieldName].value;
        }
        return values;
    }
    // Method to get all form errors
    getFormErrors() {
        const errors = {};
        for (const fieldName in this.fields) {
            errors[fieldName] = this.fields[fieldName].error;
        }
        return errors;
    }
    // Method to handle form submission
    handleSubmit(onSubmit) {
        if (this.validateAllFields()) {
            onSubmit(this.getFormValues());
        }
        else {
            console.warn("Form is not valid:", this.getFormErrors());
        }
    }
}
//
// // Example validators
// const required = (value: string) => (value ? null : 'This field is required');
// const email = (value: string) => (/^[^@]+@[^@]+\.[^@]+$/.test(value) ? null : 'Invalid email address');
// // Initialize form fields
// const initialFields = {
//   name: { name: 'name', value: '', error: '', validators: [required] },
//   email: { name: 'email', value: '', error: '', validators: [required, email] },
// };
// // Create a form instance
// const myForm = new Form(initialFields);
// // Set field values
// myForm.setFieldValue('name', 'John Doe');
// myForm.setFieldValue('email', 'john.doe@example.com');
// // Get field values
// console.log(myForm.getFieldValue('name')); // John Doe
// console.log(myForm.getFieldValue('email')); // john.doe@example.com
// // Handle form submission
// myForm.handleSubmit((values) => {
//   console.log('Form submitted with values:', values);
// });
