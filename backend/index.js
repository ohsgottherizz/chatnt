//import OpenAI from 'openai';
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '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',
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices);
}

main();