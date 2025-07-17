import { reactive } from "vue";
import { isEmail, isEmpty, isPhone, isValidLength } from "~/utils/validation";

export const useFormValidation = () => {
  const formErrors = reactive<Record<string, string>>({});

  // Field validators
  const validateText = (fieldName: string, value: string, minLength: number = 2) => {
    if (isEmpty(value)) {
      formErrors[fieldName] = "This field is required."
      return false
    } else if (!isValidLength(value, minLength)) {
      formErrors[fieldName] = `This field expects at least ${minLength} characters.`
      return false
    }
    delete formErrors[fieldName]
    return true
  }

  const validateEmail = (fieldName: string, value: string) => {
    if (isEmpty(value)) {
      formErrors[fieldName] = "Email is required.";
      return false;
    } else if (!isEmail(value)) {
      formErrors[fieldName] = "Please enter a valid email."
      return false;
    }
    delete formErrors[fieldName];
    return true;
  }

  // In useFormValidation.ts
    const validatePsw = (fieldName: string, value: string) => {
        if (isEmpty(value)) {
            formErrors[fieldName] = "Password is required."
            return false
        } else if (!isValidLength(value, 8)) {
            formErrors[fieldName] = "Password must be at least 8 characters."
            return false
        }
        delete formErrors[fieldName]
        return true
    }

    const comparePswFields = (fieldName: string, psw1: string, psw2: string) => {
        if (isEmpty(psw2)) {
            formErrors[fieldName] = "Please confirm your password."
            return false
        } else if (psw1 !== psw2) {
            formErrors[fieldName] = "Passwords don't match."
            return false
        }
        delete formErrors[fieldName]
        return true
    }

  const validatePhone = (fieldName: string, value: string) => {
    if (isEmpty(value)) {
      formErrors[fieldName] = "Phone is required.";
      return false;
    } else if (!isPhone(value)) {
      formErrors[fieldName] = "Incorrect phone format detected. Use the format +1 (123) 456-7890 or 123-456-7890.";
      return false;
    }
    delete formErrors[fieldName];
    return true;
  }

    const validateMultiSelect = (fieldName: string, values: any[]) => {
        if (isEmpty(values)) {
            formErrors[fieldName] = "Please select at least one option.";
            return false;
        }
        delete formErrors[fieldName];
        return true;
    }

  // Form-wide validation
  const validateForm = (fields: {name: string, value: any, validator: Function}[]) => {
    let isValid = true;
    fields.forEach(field => {
      if (!field.validator(field.name, field.value)) {
        isValid = false;
      }
    })
    return isValid;
  }

  return {
    formErrors,
    validateText,
    validateEmail,
    validatePhone,
    validatePsw,
    comparePswFields,
    validateMultiSelect,
    validateForm
  }
}