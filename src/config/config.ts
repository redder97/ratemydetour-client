import envDev from './env.dev';
import envStaging from './env.staging';

let env: {[key: string]: any} = envDev;

(()=> {
    if (process.env.ENV == "STAGING") {
        env = {...envDev, ...envStaging};      
        console.log(env); 
    }
})();

export default env;