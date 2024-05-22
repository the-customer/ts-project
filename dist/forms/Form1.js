"use strict";
class FormHandler {
    constructor(formSelector) {
        this.formElement = document.querySelector(formSelector);
        if (!this.formElement) {
            throw new Error('Form not found');
        }
    }
    // Get form data as an object
    getFormData() {
        const formData = new FormData(this.formElement);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }
    // Set form data from an object
    setFormData(data) {
        Object.keys(data).forEach(key => {
            const input = this.formElement.elements.namedItem(key);
            if (input) {
                input.value = data[key];
            }
        });
    }
    // Reset the form
    resetForm() {
        this.formElement.reset();
    }
    // Validate the form
    validateForm() {
        let isValid = true;
        const inputs = this.formElement.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add('error'); // Add an error class for styling purposes
            }
            else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }
    // Example of how to handle form submission
    handleSubmit(callback) {
        this.formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            if (this.validateForm()) {
                const data = this.getFormData();
                callback(data);
            }
        });
    }
}
// Usage example:
const formHandler = new FormHandler('#myForm');
formHandler.handleSubmit((data) => {
    console.log('Form submitted successfully with data:', data);
});
