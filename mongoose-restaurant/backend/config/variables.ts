const requiredEnvs=["MONGODB_CONNECTION_STRING", "PORT", "NODE_ENV"]
const parsedEnvs:Record<string, string>={}
const validateEnvs=()=>{
    requiredEnvs.forEach(env=>{
        // process.env.MONGODB_CONNECTION_STRING
        const parsedEnv=process.env[env];
        if(!parsedEnv){
            throw new Error(`Missing required environment variable: ${env}`);
        }
        // parsedEnvs["MONGODB_CONNECTION_STRING"]=process.env.MONGODB_CONNECTION_STRING
        parsedEnvs[env]=parsedEnv;
    })
}

export {parsedEnvs, validateEnvs};


