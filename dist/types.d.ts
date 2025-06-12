/**
 * Type definitions for helper functions
 */
/**
 * Interface for file upload handler parameters
 */
export interface FileUploadHandler {
    file: File | null;
    setFile: (file: File | null) => void;
    onFileUpload?: (file: File) => void;
    triggerError: () => void;
}
/**
 * Options for upload validation
 */
export interface UploadOptions {
    allowedTypes: string[];
    maxSizeMB?: number;
    fileTypeLabel: string;
}
/**
 * Options for coupon generation
 */
export interface CouponOptions {
    length?: number;
    prefix?: string;
    suffix?: string;
    includeNumbers?: boolean;
    includeUppercase?: boolean;
    includeLowercase?: boolean;
    includeSpecialChars?: boolean;
}
/**
 * Date range object for filtering
 */
export interface DateRange {
    startDate: string;
    endDate: string;
}
/**
 * Validation rule for password validation
 */
export interface ValidationRule {
    id: number;
    validation: string;
    exp: RegExp;
}
