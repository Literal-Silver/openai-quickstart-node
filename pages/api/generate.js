import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-001", {
    prompt: generatePrompt(req.body.weapon),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(weapon) {
  const capitalizedweapon =
    weapon[0].toUpperCase() + weapon.slice(1).toLowerCase();
  return `Suggest three names for an common weapon.

weapon: Sword
Names: longsword, shortsword, broadsword
weapon: Bow
Names: shortbow, longbow, AK-47
weapon: ${capitalizedweapon}
Names:`;
}
