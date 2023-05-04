import axios from "axios";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import readLineSync from "readline-sync";

const fetchNovels = async () => {
  const INFO_FILE_PATH = "data/info.json";
  const NOVELS_FOLDER = "data/novels";
  const fileExists = existsSync(INFO_FILE_PATH);
  const foldreExists = existsSync(NOVELS_FOLDER);
  if (!fileExists) return;
  if (!foldreExists) {
    mkdirSync(NOVELS_FOLDER);
  }

  const novelsData = JSON.parse(readFileSync(INFO_FILE_PATH, "utf8")).flat() ;

  let shouldRefetch = true;
  const askQuestion = () => {
    const choises = ["y", "n"];
    const ansnwer = readLineSync.question("should refetch the novels y/n : ");
    if (choises.includes(ansnwer.toLocaleLowerCase())) {
      shouldRefetch = ansnwer.toLocaleLowerCase() === "y" ? true : false;
      return;
    }
    askQuestion();
  };

  askQuestion();
  if (shouldRefetch) {
    console.log("fetching novels started ");

    const novelsChunks = [];
    const chunkSize = 100;

    for (let i = 0; i < novelsData.length; i += chunkSize) {
      novelsChunks.push(novelsData.slice(i, i + chunkSize));
    }

    for (let i = 0; i < novelsChunks.length; i++) {
      const novelsChunk = novelsChunks[i];
      console.log(`fetching novels chunk ${i + 1} of ${novelsChunks.length}`);

      await Promise.all(
        novelsChunk.map(async (novel) => {
          const { title, formats: novelformats } = novel;
          
          const formats = [
            "text/plain; charset=utf-8", 
            "text/plain; charset=us-ascii", 
            "text/plain; charset=iso-8859-1", 
            "text/plain"
          ]
          process.stdout.write(`\r fetching ${title} in progress...`);
          
          for(let format of formats){
            const textFile = novelformats[format]
            if(!textFile) continue;
            try {
              const text = (await axios(textFile)).data;
              writeFileSync(join(NOVELS_FOLDER, `${title}.txt`), text, "utf-8");
              break;
            } catch (error) {
              console.log(`couldn't fetch the text file for ${title} with format ${format}`);
            }
          }
        })
      );
    }
  }
};

export default fetchNovels;
