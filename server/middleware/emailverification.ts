import { NextFunction, Request, Response } from 'express'
import _User from '../models/UserSchema'


export default async function emailVerifier(req: Request,res: Response,next: NextFunction){
    try {
        const email = req.body.email
        if(!email) return res.sendStatus(400)
        const query = await _User.findOne({Email: email})
        if(query){
            return res.sendStatus(409)
        }
        return next()
    } catch (error) {
        console.error(error);
    }
}