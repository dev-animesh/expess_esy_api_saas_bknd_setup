// Utility function to validate request body
const validateRequestBody = (schema, obj) => {
    for (let key in schema) {
        if (schema.hasOwnProperty(key)) {
            const schemaValue = schema[key];
            const objValue = obj[key];

            if (Array.isArray(schemaValue)) {
                if (!Array.isArray(objValue)) {
                    return false;
                }
                if (schemaValue.length > 0) {
                    // If schema array has elements, validate each object in objValue
                    return objValue.every(item => validateRequestBody(schemaValue[0], item));
                }
            } else if (typeof schemaValue === 'object') {
                if (typeof objValue !== 'object' || !validateRequestBody(schemaValue, objValue)) {
                    return false;
                }
            } else if (typeof objValue !== schemaValue) {
                return false;
            }
        }
    }
    return true;
};

export default validateRequestBody;