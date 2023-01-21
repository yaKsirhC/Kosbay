import fs from "fs";

export default function saveFile(name: string, content: Buffer) {
  try {
    fs.writeFileSync(process.env.IMAGE_STORAGE + name, content);
  } catch (error) {
    console.error(error);
  }
}
