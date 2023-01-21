import { NextFunction, Request, Response } from "express";
import _User from "../models/UserSchema";

export default async function isSuperVerifier(req: Request, res: Response, next: NextFunction){
    try {
        const uid = req.cookies._ver
        if(!uid) return res.sendStatus(404)
        const isSuper = await _User.findById(uid, 'IsSuper')
        if(!isSuper?.IsSuper) return res.sendStatus(403)
        next()
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
}