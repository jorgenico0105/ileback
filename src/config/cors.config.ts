import {CorsOptions} from 'cors'

export const corsConfig:CorsOptions={
    origin:function(origin,callback){
        const whitelist=[process.env.FRONTEND_URL || 'http://localhost:4200']
        if(whitelist.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error('error de cors'))
        }
    }
}