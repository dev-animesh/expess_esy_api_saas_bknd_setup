// Example schema definition 
export const userSchema = Object.freeze({
    name: 'string',
    age: 'number',
    arr: [],
    arryObj: [
        {
            name: 'string',
            age: 'number',
            isActive: 'boolean'
        }
    ],
    isActive: 'boolean'
});