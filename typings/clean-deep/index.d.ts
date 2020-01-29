declare module 'clean-deep' {
    export default function cleanDeep(
        obj: {[key: string]: any},
        options?: {
            cleanKeys?: string[];
            cleanValues?: string[];
            emptyArrays?: boolean;
            emptyObjects?: boolean;
            emptyStrings?: boolean;
            nullValues?: boolean;
            undefinedValues?: boolean;
        }
    ): any
}
