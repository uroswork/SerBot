export class FormValidator {
    validateName(value) {
        return value.length > 0;
    }

    validateMail(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(value);
    }

    validatePassword(value) {
        return value.length > 7;
    }
}