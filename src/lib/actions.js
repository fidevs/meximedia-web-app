export function validateInputText(name, value, errors) {
    let condition = ""
    if(value === "" || value === null || !value) {
        condition = 'is-invalid'
    }else if(value !== "" || value !== null || value) {
        condition = 'is-valid'
    }
    errors[name] = condition
    return errors
}