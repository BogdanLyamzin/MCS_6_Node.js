import fs from "node:fs/promises";
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";

const fileOperations = async () => {
//     const {encoding} = await DetectFileEncodingAndLanguage("./files/file.txt");
//   const text = await fs.readFile("./files/file.txt", encoding);
//   console.log(text);
// await fs.appendFile("./files/file.txt", "\nPHP");
// const result = await fs.writeFile("./files/file.txt", "Mojo");
// console.log(result)
// await fs.readFile("./files/file2.txt", "utf-8");
// await fs.appendFile("./files/file2.txt", "\nPHP");
// await fs.writeFile("./files/file3.txt", "utf-8");
await fs.unlink("./files/file3.txt")
};
fileOperations();
// fs.readFile("./files/file.txt")
//     .then(data => console.log(data))
//     .catch(error => console.log(data))

// fs.readFile("./files/file.txt", (error, data)=> {
//     console.log(error);
//     console.log(data);
// })
