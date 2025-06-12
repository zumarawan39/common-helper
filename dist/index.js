import toast from 'react-hot-toast';
import moment from 'moment';
import { CURRENCY_SYMBOLS } from './constants';
/**
 * ============================================================================
 * FILE VALIDATION HELPERS
 * ============================================================================
 */
/**
 * Validates if a file is a valid image type
 * @param file - The file to validate
 * @returns boolean - True if file is a valid image type
 */
export const validateImage = (file) => {
    const validImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    return validImageTypes.includes(file.type);
};
/**
 * Handles file upload with validation and error handling
 * @param file - The file to upload
 * @param mutateFn - Function to handle the upload mutation
 * @param options - Upload validation options
 */
export const handleUpload = (file, mutateFn, options) => {
    if (!file)
        return;
    const { allowedTypes, maxSizeMB = 1, fileTypeLabel } = options;
    const maxSize = maxSizeMB * 1024 * 1024;
    if (!allowedTypes.includes(file.type)) {
        toast.error(`Please upload a valid ${fileTypeLabel} file (${allowedTypes.join(', ')})`);
        return;
    }
    if (file.size > maxSize) {
        toast.error(`${fileTypeLabel} size should not exceed ${maxSizeMB}MB`);
        return;
    }
    const formData = new FormData();
    formData.append('file', file);
    mutateFn(formData);
};
/**
 * Handles file upload with custom validation and callbacks
 * @param params - FileUploadHandler parameters
 */
export const handleFileUpload = ({ file, setFile, onFileUpload, triggerError, }) => {
    if (file) {
        const isValidFileType = [
            'image/jpeg',
            'image/png',
            'application/pdf',
        ].includes(file.type);
        if (!isValidFileType) {
            triggerError();
            return;
        }
        setFile(file);
        if (onFileUpload) {
            onFileUpload(file);
        }
    }
};
/**
 * ============================================================================
 * TEXT MANIPULATION HELPERS
 * ============================================================================
 */
/**
 * Truncates an ID string with ellipsis in the middle
 * @param id - The ID string to truncate
 * @param startLength - Number of characters to show at the start
 * @param endLength - Number of characters to show at the end
 * @returns string - Truncated ID
 */
export const truncateId = (id, startLength = 3, endLength = 4) => {
    if (id.length <= startLength + endLength + 3)
        return id;
    const start = id.slice(0, startLength);
    const end = id.slice(-endLength);
    return `${start}...${end}`;
};
/**
 * Truncates text with customizable options
 * @param text - The text to truncate
 * @param startLength - Number of characters to show at the start
 * @param endLength - Number of characters to show at the end
 * @param appendText - Text to append (default: '...')
 * @param appendPosition - Position to append text ('center' or 'end')
 * @returns string - Truncated text
 */
export const truncate = (text, startLength = 3, endLength = 4, appendText = '...', appendPosition = 'center') => {
    if (!text)
        return '';
    if (appendPosition === 'center') {
        if (text.length <= startLength + endLength + 3)
            return text;
        const start = text.slice(0, startLength);
        const end = text.slice(-endLength);
        return `${start}*********${end}`;
    }
    else if (appendPosition === 'end') {
        if (text.length <= startLength)
            return text;
        const start = text.slice(0, startLength);
        return `${start}${appendText}`;
    }
    return text;
};
/**
 * Truncates text to first 3 words and appends "..."
 * @param text - The text to truncate
 * @returns string - Truncated text
 */
export const truncateText = (text) => {
    const words = text.split(' ');
    return words.length > 3 ? `${words.slice(0, 3).join(' ')}...` : text;
};
/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns string - String with first letter capitalized
 */
export const capitalizeFirstLetter = (str) => {
    if (!str)
        return '';
    return str[0].toUpperCase() + str.slice(1);
};
/**
 * Masks an email address for privacy while keeping it recognizable
 * @param email - The full email address to mask
 * @param visibleStartChars - Number of characters to show at the start of username
 * @param visibleEndChars - Number of characters to show at the end of username
 * @returns string - The masked email address
 */
export const maskEmail = (email, visibleStartChars = 2, visibleEndChars = 1) => {
    if (!email || !email.includes('@')) {
        return '';
    }
    const [username, domain] = email.split('@');
    if (username.length <= visibleStartChars + visibleEndChars) {
        return email;
    }
    const maskedLength = username.length - visibleStartChars - visibleEndChars;
    const start = username.substring(0, visibleStartChars);
    const end = username.substring(username.length - visibleEndChars);
    const masked = '*'.repeat(Math.min(maskedLength, 5));
    return `${start}${masked}${end}@${domain}`;
};
/**
 * ============================================================================
 * CLIPBOARD HELPERS
 * ============================================================================
 */
/**
 * Copies text to clipboard with fallback support
 * @param text - The text to copy to clipboard
 */
export const copyToClipboard = (text) => {
    if (navigator.clipboard && window.isSecureContext) {
        // Modern async clipboard API
        navigator.clipboard
            .writeText(text)
            .then(() => {
            toast.success('Copied to clipboard');
        })
            .catch((err) => {
            toast.error('Failed to copy ❌', err);
        });
    }
    else {
        // Fallback for insecure context or older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            toast.success(successful ? 'Copied to clipboard' : 'Copy failed');
        }
        catch (err) {
            toast.error('Fallback copy failed', err);
        }
        document.body.removeChild(textArea);
    }
};
/**
 * ============================================================================
 * CURRENCY & FORMATTING HELPERS
 * ============================================================================
 */
/**
 * Formats currency symbol based on currency code
 * @param currency - The currency code (e.g., 'USD', 'EUR')
 * @returns string - The currency symbol
 */
export const formatCurrency = (currency) => {
    return `${CURRENCY_SYMBOLS[currency]}`;
};
/**
 * ============================================================================
 * DATE & TIME HELPERS
 * ============================================================================
 */
/**
 * Gets date range based on filter type
 * @param filter - Filter type (1: Daily, 7: Weekly, 30: Monthly)
 * @returns DateRange - Object with startDate and endDate
 */
export const getDateRange = (filter) => {
    const range = {
        startDate: '',
        endDate: '',
    };
    switch (filter) {
        case 1: // Daily
            range.startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
            range.endDate = moment()
                .add(1, 'day')
                .endOf('day')
                .subtract(1, 'second')
                .format('YYYY-MM-DD HH:mm:ss');
            break;
        case 7: // Weekly
            range.startDate = moment()
                .subtract(7, 'days')
                .format('YYYY-MM-DD HH:mm:ss');
            range.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
            break;
        case 30: // Monthly
            range.startDate = moment()
                .subtract(1, 'month')
                .format('YYYY-MM-DD HH:mm:ss');
            range.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
            break;
        default:
            range.startDate = moment()
                .subtract(1, 'day')
                .format('YYYY-MM-DD HH:mm:ss');
            range.endDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    return range;
};
/**
 * Formats date string for API consumption
 * @param dateString - The date string to format
 * @returns string - Formatted date in YYYY-MM-DD format
 */
export const formatDateForAPI = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD');
};
/**
 * ============================================================================
 * FILTER & QUERY HELPERS
 * ============================================================================
 */
/**
 * Builds filters object by removing empty values and trimming strings
 * @param filters - Object containing filter parameters
 * @returns object - Cleaned filters object
 */
export const buildFilters = (filters) => {
    const parsedFilters = {};
    // Generic check for any key
    Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (filters.kyc_status && filters.kyc_status !== '') {
            parsedFilters.kyc_status = filters.kyc_status;
        }
        if (filters.sortField && filters.sortField !== '') {
            parsedFilters.sortField = filters.sortField;
        }
        if (filters.sortDirection && filters.sortDirection !== '') {
            parsedFilters.sortDirection = filters.sortDirection;
        }
        if (filters.locate && filters.locate.trim() !== '') {
            parsedFilters.locate = filters.locate.trim();
        }
        if (filters.locate && filters.locate.trim() !== '') {
            parsedFilters.locate = filters.locate.trim();
        }
        if (value !== null && value !== undefined && value !== '') {
            parsedFilters[key] = typeof value === 'string' ? value.trim() : value;
        }
    });
    return parsedFilters;
};
/**
 * ============================================================================
 * VALIDATION HELPERS
 * ============================================================================
 */
/**
 * Validates if a string is a valid IP address (IPv4 or IPv6)
 * @param ip - The IP address string to validate
 * @returns boolean - True if valid IP address
 */
export const isValidIpAddress = (ip) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}(([0-9]{1,3}\.){3,3}[0-9]{1,3})|([0-9a-fA-F]{1,4}:){1,4}:(([0-9]{1,3}\.){3,3}[0-9]{1,3}))$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
};
/**
 * ============================================================================
 * GENERATION HELPERS
 * ============================================================================
 */
/**
 * Generates a random coupon code with customizable options
 * @param options - Coupon generation options
 * @returns string - Generated coupon code
 */
export const generateCoupon = (options = {}) => {
    const { length = 8, prefix = '', suffix = '', includeNumbers = true, includeUppercase = true, includeLowercase = false, includeSpecialChars = false, } = options;
    const numbers = '0123456789';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let chars = '';
    if (includeNumbers)
        chars += numbers;
    if (includeUppercase)
        chars += uppercase;
    if (includeLowercase)
        chars += lowercase;
    if (includeSpecialChars)
        chars += special;
    if (chars === '') {
        throw new Error('At least one character type must be included');
    }
    let coupon = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        coupon += chars[randomIndex];
    }
    return `${prefix}${coupon}${suffix}`.replace(/\s+/g, '');
};
/**
 * Generates a random password with guaranteed character types
 * @param length - Length of the password (default: 6)
 * @returns string - Generated password
 */
export const generateRandomPassword = (length = 6) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?';
    const randomChar = (min, max) => charset[Math.floor(Math.random() * (max - min + 1)) + min];
    // Ensure at least one of each required character type
    const password = [
        randomChar(0, 25), // lowercase
        randomChar(26, 51), // uppercase
        randomChar(52, 61), // number
        randomChar(62, 68), // symbol
    ];
    // Fill the rest of the password with random characters
    while (password.length < length) {
        password.push(randomChar(0, charset.length - 1));
    }
    // Shuffle the password to improve randomness
    return password.sort(() => Math.random() - 0.5).join('');
};
/**
 * ============================================================================
 * PERFORMANCE HELPERS
 * ============================================================================
 */
/**
 * Debounces a function to limit how often it can be called
 * @param func - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Function - Debounced function
 */
export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};
/**
 * Throttles a function to limit how often it can be called
 * @param func - The function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Function - Throttled function
 */
export const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};
/**
 * ============================================================================
 * FORMATTING HELPERS
 * ============================================================================
 */
/**
 * Formats a phone number with proper spacing and formatting
 * @param phoneNumber - The phone number string to format
 * @returns string - Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    // Format based on length
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    else if (cleaned.length === 11 && cleaned.startsWith('1')) {
        return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
    else if (cleaned.length === 12 && cleaned.startsWith('91')) {
        return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }
    // Return original if no pattern matches
    return phoneNumber;
};
/**
 * ============================================================================
 * VALIDATION HELPERS
 * ============================================================================
 */
/**
 * Validates if a string is a valid email address
 * @param email - The email string to validate
 * @returns boolean - True if valid email
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
/**
 * Validates if a string meets password strength requirements
 * @param password - The password string to validate
 * @param minLength - Minimum length (default: 8)
 * @returns boolean - True if valid password
 */
export const isValidPassword = (password, minLength = 8) => {
    // At least minLength characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const passwordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{${minLength},}$`);
    return passwordRegex.test(password);
};
/**
 * Validates if a string is a valid URL
 * @param url - The URL string to validate
 * @returns boolean - True if valid URL
 */
export const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
};
/**
 * Validates if a string is a valid credit card number (Luhn algorithm)
 * @param cardNumber - The credit card number string to validate
 * @returns boolean - True if valid credit card number
 */
export const isValidCreditCard = (cardNumber) => {
    // Remove spaces and dashes
    const cleaned = cardNumber.replace(/\s+/g, '').replace(/-/g, '');
    // Check if it's all digits and has valid length
    if (!/^\d{13,19}$/.test(cleaned)) {
        return false;
    }
    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    for (let i = cleaned.length - 1; i >= 0; i--) {
        let digit = parseInt(cleaned.charAt(i));
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        isEven = !isEven;
    }
    return sum % 10 === 0;
};
/**
 * Validates if a string is a valid US Social Security Number
 * @param ssn - The SSN string to validate
 * @returns boolean - True if valid SSN
 */
export const isValidSSN = (ssn) => {
    // Remove spaces and dashes
    const cleaned = ssn.replace(/\s+/g, '').replace(/-/g, '');
    // Check format: XXX-XX-XXXX or XXXXXXXXX
    const ssnRegex = /^(?!000|666|9\d{2})\d{3}(?!00)\d{2}(?!0000)\d{4}$/;
    return ssnRegex.test(cleaned);
};
/**
 * Validates if a string is a valid US ZIP code
 * @param zipCode - The ZIP code string to validate
 * @returns boolean - True if valid ZIP code
 */
export const isValidZipCode = (zipCode) => {
    // US ZIP code format: XXXXX or XXXXX-XXXX
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zipCode);
};
/**
 * ============================================================================
 * UTILITY HELPERS
 * ============================================================================
 */
/**
 * Generates a UUID v4 string
 * @returns string - Generated UUID
 */
export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
