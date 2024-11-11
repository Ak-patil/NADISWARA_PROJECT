const FormData = require('form-data');

export const appendObjectToForm = (object) => {
    const form = new FormData();
    for (const [key, value] of Object.entries(object)) {
        form.append(key, value);
    }
    return form;
};

// Usage example
