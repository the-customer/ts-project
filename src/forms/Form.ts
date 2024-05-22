
interface Validator{
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    email?: boolean;
    url?: boolean;
}

export class FormHandler {
    private formElement: HTMLFormElement;

    constructor(formSelector: string) {
        this.formElement = document.querySelector(formSelector) as HTMLFormElement;
        if (!this.formElement) {
            throw new Error('Form not found');
        }
    }

    getFormData(): Record<string, any> {
        const formData = new FormData(this.formElement);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            console.log(value)
            data[key] = value;
        });
        return data;
    }

    resetForm(): void {
        this.formElement.reset();
    }

    validateForm(): boolean {
        let isValid = true;
        const inputs = this.formElement.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            
            //Validation ....
        });

        return isValid;
    }
    handleSubmit(callback: (data: Record<string, any>) => void): void {
        this.formElement.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            if (this.validateForm()) {
                const data = this.getFormData();
                callback(data);
            }
        });
    }
}
