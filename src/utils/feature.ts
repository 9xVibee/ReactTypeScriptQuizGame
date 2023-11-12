/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { generate } from "random-words";
import _ from "lodash";

const generateOptions = (words: { Text: string }[], idx: number): string[] => {
  const correctAns: string = words[idx].Text;

  const incorrectArray: { Text: string }[] = words.filter(
    (i) => i.Text != correctAns
  );

  const inCorrectOptions: string[] = _.sampleSize(incorrectArray, 3).map(
    (word) => word.Text
  );

  const mcqOptions = _.shuffle([...inCorrectOptions, correctAns]);
  return mcqOptions;
};

export const translateWords = async (params: LangType): Promise<WordType[]> => {
  try {
    // coverting words array to this format
    const words = generate(8).map((item) => ({
      Text: item,
    }));

    const response = await axios.post(
      "https://microsoft-translator-text.p.rapidapi.com/translate",
      words,
      {
        params: {
          "to[0]": `${params}`,
          "api-version": "3.0",
          profanityAction: "NoAction",
          textType: "plain",
        },
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "5c19cf80camsh27e946b6a95cc7dp1b7ff0jsn2d8c6dd465be",
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
      }
    );

    const received: FetchDataType[] = response.data;

    const arr: WordType[] = received.map((item, idx) => {
      const options: string[] = generateOptions(words, idx);
      return {
        word: item.translations[0].text,
        meaning: words[idx].Text,
        options,
      };
    });

    return arr;
  } catch (err) {
    console.log(err);
    throw new Error("Some error");
  }
};

export const countMatchingFeature = (
  arr1: string[],
  arr2: string[]
): number => {
  let matchingEle = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) matchingEle++;
  }
  return matchingEle;
};
