let key = "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";

let open_ai_response;

let conversation = [
  { role: "user", content: "Hi" },
  { role: "assistant", content: "Hi, how can I help you today" },
];

async function conversationUserAdd(question, senteiment) {
  conversation.push({
    role: "user",
    content:
      "My happiness out of 10:" + senteiment + "my question is:" + question,
  });
}
async function conversationAssistantAdd(respons) {
  conversation.push({ role: "assistant", content: respons });
}

async function openai_test() {
  let url = "https://api.openai.com/v1/chat/completions";

  let openai1 = "sk";
  let openai2 = "-ARmBYmBgE69LcWHYknguT3B";
  let openai3 = "lbkFJIiaAPCEWCdgVyodtMBuc";
  let apikey = openai1 + openai2 + openai3;

  let data = { model: "gpt-3.5-turbo", messages: conversation };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const responseData = await response.json();
      const message = responseData.choices[0];

      conversationAssistantAdd(message);

      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.speak(utterance);
      return message;
    } else {
      console.log("Request error: ", response.status);
    }
  } catch (error) {
    console.error("there is an error:", error);
  }
}