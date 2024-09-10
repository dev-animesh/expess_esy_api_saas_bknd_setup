export const regex = Object.freeze({
    email: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    date_YYYY_MM_DD: '^\d{4}-\d{2}-\d{2}$',
    url: '^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$',
    phone_IN: '^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$',
    number: '^-?\d*\.?\d+$',
    username: '^[a-zA-Z0-9]{3,16}$',
    password: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$',
    zipcode_US: '^\d{5}(-\d{4})?$',
    ip_address: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    hex_color: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$'
});



// To use these patterns:
const emailPattern = new RegExp(regex.email);
console.log(emailPattern.test('example@email.com')); // Outputs: true