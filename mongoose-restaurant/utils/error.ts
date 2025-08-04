import { parsedEnvs } from "../config/variables";

export const defineError = (error: any) => {
    if (parsedEnvs.NODE_ENV === "development") {
        // Handle different error types
        if (typeof error === 'string') {
            return error;
        } else if (error instanceof Error) {
            return error.message;
        } else if (error && typeof error === 'object') {
            return error.message || JSON.stringify(error);
        }
        return String(error);
    }

    return "Internal server error";
}