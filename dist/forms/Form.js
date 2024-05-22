export class FormHandler {
    constructor(formSelector) {
        this.formElement = document.querySelector(formSelector);
        if (!this.formElement) {
            throw new Error('Form not found');
        }
    }
    getFormData() {
        const formData = new FormData(this.formElement);
        const data = {};
        formData.forEach((value, key) => {
            console.log(value);
            data[key] = value;
        });
        return data;
    }
    resetForm() {
        this.formElement.reset();
    }
    validateForm() {
        let isValid = true;
        const inputs = this.formElement.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            //Validation ....
        });
        return isValid;
    }
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
