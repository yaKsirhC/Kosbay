export default function detectFileExt(fileName: string){
    const splits = fileName.split('.') as any[]
    if(!splits[1]){
        console.log(splits);
        return 'file'
    }
    if(splits[splits.length -1] === 'txt'){
        return 'file'
    }
    if(splits[splits.length -1] === 'jpg', splits[splits.length -1] === 'png' || splits[splits.length -1] === 'jpeg'){
        return 'img'
    }
    if(splits[splits.length -1] === 'zip'){
        return 'zip'
    }
    return 'unkw'
}