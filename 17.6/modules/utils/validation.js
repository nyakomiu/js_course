export function validateField(value, fieldName) {
    if (!value || value.trim() === '') {
        return `Поле "${fieldName}" обязательно для заполнения`;
    }
    if (value.length < 2) {
        return `Поле "${fieldName}" должно содержать минимум 2 символа`;
    }
    if (value.length > 100) {
        return `Поле "${fieldName}" должно содержать не более 100 символов`;
    }
    return '';
}

export function validateNumberField(value, fieldName) {
    if (!value || value.trim() === '') {
        return `Поле "${fieldName}" обязательно для заполнения`;
    }
    
    const numValue = parseFloat(value);
    
    if (isNaN(numValue)) {
        return `Поле "${fieldName}" должно быть числом`;
    }
    
    if (fieldName === 'Вес' && numValue <= 0) {
        return 'Вес должен быть положительным числом';
    }
    
    if (fieldName === 'Время хранения' && numValue < 1) {
        return 'Время хранения должно быть не менее 1 дня';
    }
    
    return '';
}