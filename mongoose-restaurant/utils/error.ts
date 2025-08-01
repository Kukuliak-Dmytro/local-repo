import { parsedEnvs } from "../config/variables";

export const defineError = (error: string) => {
    if (parsedEnvs.NODE_ENV === "development") {
        return error;
    }

    return "Internal server error";


}