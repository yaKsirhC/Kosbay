import { randomBytes } from "crypto";

export default function generatePath(og: string){
    return randomBytes(5).toString('hex') + '---' + og
}

