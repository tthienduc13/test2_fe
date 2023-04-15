import axios from "axios";

interface YesNoResponse {
  answer: string;
}
export async function getResult() {
  try {
    const response = await axios.get<YesNoResponse>(`https://yesno.wtf/api?`);
    console.log(response.data.answer);
    return response.data.answer;
  } catch (error) {
    console.log(error);
    return "no";
  }
}
