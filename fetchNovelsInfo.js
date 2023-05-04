import axios from "axios";
import { writeFileSync, existsSync} from "fs";
import readLineSync from "readline-sync";

const fetchNovelsInfo = async () => {
  const INFO_FILE_PATH = "data/info.json";

  let shouldRefetch = true;
  const fileExists = existsSync(INFO_FILE_PATH);

  const askQuestion = () => {
    const choises = ["y", "n"];
    const ansnwer = readLineSync.question(
      "should refetch the information y/n : "
    );
    if (choises.includes(ansnwer.toLocaleLowerCase())) {
      shouldRefetch = ansnwer.toLocaleLowerCase() === "y" ? true: false;
      return;
    }
    askQuestion();
  };
  if (fileExists) {
    askQuestion();
  }

  if (shouldRefetch) {
    let url = "https://gutendex.com/books";
    let pagesConut = 0;
    const MAX_PAGES = 1500;
    const results = [];
    console.log("fetching novels information started...");
    do {
        process.stdout.write(`\r fetch ${url} in progress...`)
      const data = (await axios.get(url)).data;
      const filteredResult = data.results.filter(
        (r) => !r.copyright && r.subjects.some((s) => s.includes("Fiction"))
      );
      results.push(filteredResult);
      pagesConut++;
      url = data.next;
    } while (url && pagesConut < MAX_PAGES);
    writeFileSync(INFO_FILE_PATH, JSON.stringify(results), "utf-8")
  }
};

export default fetchNovelsInfo;
