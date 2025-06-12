import { FileUploadHandler, UploadOptions, CouponOptions, DateRange, ValidationRule } from './types';
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
export declare const validateImage: (file: File) => boolean;
/**
 * Handles file upload with validation and error handling
 * @param file - The file to upload
 * @param mutateFn - Function to handle the upload mutation
 * @param options - Upload validation options
 */
export declare const handleUpload: (file: File, mutateFn: (data: FormData) => void, options: UploadOptions) => void;
/**
 * Handles file upload with custom validation and callbacks
 * @param params - FileUploadHandler parameters
 */
export declare const handleFileUpload: ({ file, setFile, onFileUpload, triggerError, }: FileUploadHandler) => void;
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
export declare const truncateId: (id: string, startLength?: number, endLength?: number) => string;
/**
 * Truncates text with customizable options
 * @param text - The text to truncate
 * @param startLength - Number of characters to show at the start
 * @param endLength - Number of characters to show at the end
 * @param appendText - Text to append (default: '...')
 * @param appendPosition - Position to append text ('center' or 'end')
 * @returns string - Truncated text
 */
export declare const truncate: (text: string, startLength?: number, endLength?: number, appendText?: string, appendPosition?: string) => string;
/**
 * Truncates text to first 3 words and appends "..."
 * @param text - The text to truncate
 * @returns string - Truncated text
 */
export declare const truncateText: (text: string) => string;
/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns string - String with first letter capitalized
 */
export declare const capitalizeFirstLetter: (str: string) => string;
/**
 * Masks an email address for privacy while keeping it recognizable
 * @param email - The full email address to mask
 * @param visibleStartChars - Number of characters to show at the start of username
 * @param visibleEndChars - Number of characters to show at the end of username
 * @returns string - The masked email address
 */
export declare const maskEmail: (email: string, visibleStartChars?: number, visibleEndChars?: number) => string;
/**
 * ============================================================================
 * CLIPBOARD HELPERS
 * ============================================================================
 */
/**
 * Copies text to clipboard with fallback support
 * @param text - The text to copy to clipboard
 */
export declare const copyToClipboard: (text: string) => void;
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
export declare const formatCurrency: (currency: string) => string;
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
export declare const getDateRange: (filter: number) => DateRange;
/**
 * Formats date string for API consumption
 * @param dateString - The date string to format
 * @returns string - Formatted date in YYYY-MM-DD format
 */
export declare const formatDateForAPI: (dateString: string) => string;
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
export declare const buildFilters: (filters: any) => any;
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
export declare const isValidIpAddress: (ip: string) => boolean;
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
export declare const generateCoupon: (options?: CouponOptions) => string;
/**
 * Generates a random password with guaranteed character types
 * @param length - Length of the password (default: 6)
 * @returns string - Generated password
 */
export declare const generateRandomPassword: (length?: number) => string;
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
export declare const debounce: <T extends (...args: any[]) => any>(func: T, delay: number) => ((...args: Parameters<T>) => void);
/**
 * Throttles a function to limit how often it can be called
 * @param func - The function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Function - Throttled function
 */
export declare const throttle: <T extends (...args: any[]) => any>(func: T, limit: number) => ((...args: Parameters<T>) => void);
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
export declare const formatPhoneNumber: (phoneNumber: string) => string;
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
export declare const isValidEmail: (email: string) => boolean;
/**
 * Validates if a string meets password strength requirements
 * @param password - The password string to validate
 * @param minLength - Minimum length (default: 8)
 * @returns boolean - True if valid password
 */
export declare const isValidPassword: (password: string, minLength?: number) => boolean;
/**
 * Validates if a string is a valid URL
 * @param url - The URL string to validate
 * @returns boolean - True if valid URL
 */
export declare const isValidURL: (url: string) => boolean;
/**
 * Validates if a string is a valid credit card number (Luhn algorithm)
 * @param cardNumber - The credit card number string to validate
 * @returns boolean - True if valid credit card number
 */
export declare const isValidCreditCard: (cardNumber: string) => boolean;
/**
 * Validates if a string is a valid US Social Security Number
 * @param ssn - The SSN string to validate
 * @returns boolean - True if valid SSN
 */
export declare const isValidSSN: (ssn: string) => boolean;
/**
 * Validates if a string is a valid US ZIP code
 * @param zipCode - The ZIP code string to validate
 * @returns boolean - True if valid ZIP code
 */
export declare const isValidZipCode: (zipCode: string) => boolean;
/**
 * ============================================================================
 * UTILITY HELPERS
 * ============================================================================
 */
/**
 * Generates a UUID v4 string
 * @returns string - Generated UUID
 */
export declare const generateUUID: () => string;
export type { FileUploadHandler, UploadOptions, CouponOptions, DateRange, ValidationRule };
