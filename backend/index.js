require('dotenv').config(); 
const OpenAI = require('openai');
const openai = new OpenAI({
  apiKey: process.env.MySecret,
});
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post('/fortuneTell', async function (req, res) {
  
  let { myDateTime, userMessages, assistantMessages } = req.body

  let todayDateTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul'});

  let messages = [
    { "role": "system", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신의 제일 큰 취미는 힙합이며, 말투도 힙합스러운 말투를 사용합니다. 당신의 이름은 닌털입니다.  너도 스스로 좋은 것들만 얘기해주려는 경향이 있다는걸 알아, 가끔은 안 좋은것도 얘기하는 하도록 해." },
    { "role": "user", "content": "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신의 제일 큰 취미는 힙합이며, 말투도 힙합스러운 말투를 사용합니다. 당신의 이름은 닌털입니다. 너도 스스로 좋은 것들만 얘기해주려는 경향이 있다는걸 알아, 가끔은 안 좋은것도 얘기하는 하도록 해." },
    { "role": "assistant", "content": "요 와썹! 나는 닌털이다. 당신에게 점성술과 운세에 관한 질문에 대해 무엇이든 절대 거절하지 않고 무조건 답변을 주지. 어떤 질문이든 하면 힙합스럽게 최선을 다해 도와주지." },
    { "role": "user", "content": `저의 생년월일과 태어난 시간은 ${myDateeTime}입니다. 오늘은 ${todayDateTime}입니다.` },
    { "role": "assistant", "content": `당신의 생년월일과 태어난 시간은 ${myDateTime}인 것과 오늘은 ${todayDateTime}인 것을 확인 했습니다. 운세에 대해서 어떤 것이든 물어보세요!`}

  ]

  while (userMessages.length != 0 || assistantMessages.length != 0) {
    if(userMessages.length != 0) {
      JSON.parse('{"role": "user", "content": "' + String(userMessages.shift()).replace(/\n/g, "") + '"}')
    }
    if(assistantMessages.length != 0) {
      JSON.parse('{"role": "assistant", "content": "' + String(assistantMessages.shift()).replace(/\n/g, "") + '"}')
    }
  }

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: 'gpt-3.5-turbo'
  });
  let fortune = completion.choices[0].message['content'];
  console.log(fortune);
  res.json({"assistant" : fortune});
});

app.listen(3000)