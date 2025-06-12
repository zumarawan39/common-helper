# Common Helper Functions

A comprehensive collection of utility functions commonly used in React/TypeScript projects.

## Installation

```bash
npm install common-helper
```

## Usage

```typescript
import { 
  validateImage, 
  truncateId, 
  copyToClipboard, 
  formatCurrency,
  generateCoupon,
  capitalizeFirstLetter,
  isValidIpAddress,
  generateRandomPassword,
  truncateText,
  debounce,
  throttle,
  formatPhoneNumber,
  isValidEmail,
  generateUUID,
  isValidPassword,
  isValidURL,
  isValidCreditCard,
  isValidSSN,
  isValidZipCode
} from 'common-helper';
```

## Available Functions

### File Validation Helpers

#### `validateImage(file: File): boolean`
Validates if a file is a valid image type (PNG, JPEG, JPG, WEBP).

```typescript
const isValid = validateImage(file);
```

#### `handleUpload(file: File, mutateFn: Function, options: UploadOptions): void`
Handles file upload with validation and error handling.

```typescript
handleUpload(file, uploadMutation, {
  allowedTypes: ['image/jpeg', 'image/png'],
  maxSizeMB: 2,
  fileTypeLabel: 'Image'
});
```

#### `handleFileUpload(params: FileUploadHandler): void`
Handles file upload with custom validation and callbacks.

```typescript
handleFileUpload({
  file,
  setFile,
  onFileUpload: (file) => console.log('File uploaded:', file),
  triggerError: () => setError('Invalid file type')
});
```

### Text Manipulation Helpers

#### `truncateId(id: string, startLength?: number, endLength?: number): string`
Truncates an ID string with ellipsis in the middle.

```typescript
const truncated = truncateId('1234567890abcdef', 3, 4); // "123...cdef"
```

#### `truncate(text: string, startLength?: number, endLength?: number, appendText?: string, appendPosition?: 'center' | 'end'): string`
Truncates text with customizable options.

```typescript
const truncated = truncate('Hello World', 3, 4, '***', 'center'); // "Hel***orld"
```

#### `truncateText(text: string): string`
Truncates text to first 3 words and appends "...".

```typescript
const truncated = truncateText('This is a very long sentence'); // "This is a..."
```

#### `capitalizeFirstLetter(str: string): string`
Capitalizes the first letter of a string.

```typescript
const capitalized = capitalizeFirstLetter('hello world'); // "Hello world"
```

#### `maskEmail(email: string, visibleStartChars?: number, visibleEndChars?: number): string`
Masks an email address for privacy.

```typescript
const masked = maskEmail('user@example.com', 2, 1); // "us***r@example.com"
```

### Clipboard Helpers

#### `copyToClipboard(text: string): void`
Copies text to clipboard with fallback support.

```typescript
copyToClipboard('Text to copy');
```

### Currency & Formatting Helpers

#### `formatCurrency(currency: string): string`
Formats currency symbol based on currency code.

```typescript
const symbol = formatCurrency('USD'); // "$"
```

#### `formatPhoneNumber(phoneNumber: string): string`
Formats a phone number with proper spacing and formatting.

```typescript
const formatted = formatPhoneNumber('1234567890'); // "(123) 456-7890"
const formattedUS = formatPhoneNumber('11234567890'); // "+1 (123) 456-7890"
const formattedIN = formatPhoneNumber('911234567890'); // "+91 12345 67890"
```

### Date & Time Helpers

#### `getDateRange(filter: number): DateRange`
Gets date range based on filter type.

```typescript
const range = getDateRange(7); // Last 7 days
// Returns: { startDate: "2024-01-01 00:00:00", endDate: "2024-01-08 00:00:00" }
```

#### `formatDateForAPI(dateString: string): string`
Formats date string for API consumption.

```typescript
const formatted = formatDateForAPI('2024-01-15T10:30:00Z'); // "2024-01-15"
```

### Filter & Query Helpers

#### `buildFilters(filters: any): any`
Builds filters object by removing empty values and trimming strings.

```typescript
const cleanFilters = buildFilters({
  name: '  John  ',
  age: 25,
  email: '',
  status: null
});
// Returns: { name: "John", age: 25 }
```

### Validation Helpers

#### `isValidIpAddress(ip: string): boolean`
Validates if a string is a valid IP address (IPv4 or IPv6).

```typescript
const isValid = isValidIpAddress('192.168.1.1'); // true
const isValidV6 = isValidIpAddress('2001:db8::1'); // true
```

#### `isValidEmail(email: string): boolean`
Validates if a string is a valid email address.

```typescript
const isValid = isValidEmail('user@example.com'); // true
const isInvalid = isValidEmail('invalid-email'); // false
```

#### `isValidPassword(password: string, minLength?: number): boolean`
Validates if a string meets password strength requirements.

```typescript
const isValid = isValidPassword('StrongPass123!', 8); // true
const isWeak = isValidPassword('weak'); // false
```

#### `isValidURL(url: string): boolean`
Validates if a string is a valid URL.

```typescript
const isValid = isValidURL('https://example.com'); // true
const isInvalid = isValidURL('not-a-url'); // false
```

#### `isValidCreditCard(cardNumber: string): boolean`
Validates if a string is a valid credit card number using Luhn algorithm.

```typescript
const isValid = isValidCreditCard('4532015112830366'); // true
const isInvalid = isValidCreditCard('1234567890123456'); // false
```

#### `isValidSSN(ssn: string): boolean`
Validates if a string is a valid US Social Security Number.

```typescript
const isValid = isValidSSN('123-45-6789'); // true
const isInvalid = isValidSSN('000-00-0000'); // false
```

#### `isValidZipCode(zipCode: string): boolean`
Validates if a string is a valid US ZIP code.

```typescript
const isValid = isValidZipCode('12345'); // true
const isValidExtended = isValidZipCode('12345-6789'); // true
const isInvalid = isValidZipCode('1234'); // false
```

### Performance Helpers

#### `debounce(func: Function, delay: number): Function`
Debounces a function to limit how often it can be called.

```typescript
const debouncedSearch = debounce((query) => {
  // API call here
  searchAPI(query);
}, 300);

// Use in input onChange
<input onChange={(e) => debouncedSearch(e.target.value)} />
```

#### `throttle(func: Function, limit: number): Function`
Throttles a function to limit how often it can be called.

```typescript
const throttledScroll = throttle(() => {
  // Handle scroll event
  updateScrollPosition();
}, 100);

// Use in scroll event
window.addEventListener('scroll', throttledScroll);
```

### Generation Helpers

#### `generateCoupon(options?: CouponOptions): string`
Generates a random coupon code with customizable options.

```typescript
const coupon = generateCoupon({
  length: 10,
  prefix: 'PROMO',
  includeNumbers: true,
  includeUppercase: true
}); // "PROMOABC123"
```

#### `generateRandomPassword(length?: number): string`
Generates a random password with guaranteed character types.

```typescript
const password = generateRandomPassword(8); // "aB3$kL9m"
// Guarantees at least one lowercase, uppercase, number, and symbol
```

#### `generateUUID(): string`
Generates a UUID v4 string.

```typescript
const uuid = generateUUID(); // "550e8400-e29b-41d4-a716-446655440000"
```

## Types

The library exports the following TypeScript interfaces:

- `FileUploadHandler`
- `UploadOptions`
- `CouponOptions`
- `DateRange`
- `ValidationRule`

## Dependencies

- `react-hot-toast`: For toast notifications
- `moment`: For date manipulation
- `react`: Peer dependency

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch for changes
npm run dev
```

## License

ISC