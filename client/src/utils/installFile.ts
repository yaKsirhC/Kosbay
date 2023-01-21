import axios from "axios";

export default async function fetchFile(fileName: string){
    try {
        const resp = await axios.get(import.meta.env.VITE_SERVER_URL + 'files/get/install', {params: {fid: fileName}})
        return resp.data
    } catch (error) {
        console.error(error);
        return 'err'
    }

}