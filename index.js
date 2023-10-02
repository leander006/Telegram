const { Telegraf } = require("telegraf");
const { NlpManager } = require("node-nlp");
const { message } = require("telegraf/filters");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const nlpManager = new NlpManager({ languages: ["en"] });

// Train the NLP manager with question-response pairs
nlpManager.addDocument("en", "Who created you?", "bot.creator");
nlpManager.addAnswer("en", "bot.creator", "I was created by OpenAI.");

nlpManager.addDocument("en", "What can you do?", "bot.capabilities");
nlpManager.addAnswer(
  "en",
  "bot.capabilities",
  "I can answer questions, provide information, and have conversations with you."
);

nlpManager.addDocument("en", "Tell me a joke.", "bot.joke");
nlpManager.addAnswer(
  "en",
  "bot.joke",
  "Why did the computer keep freezing? Because it left its Windows open!"
);

nlpManager.addDocument(
  "en",
  "What's the weather like today?",
  "weather.current"
);
nlpManager.addAnswer(
  "en",
  "weather.current",
  "I'm sorry, I can't provide real-time weather information."
);

nlpManager.addDocument(
  "en",
  "What's your favorite color?",
  "bot.favoriteColor"
);
nlpManager.addAnswer(
  "en",
  "bot.favoriteColor",
  "I don't have a favorite color, but I like all colors!"
);

nlpManager.addDocument("en", "How are you?", "bot.feelings");
nlpManager.addAnswer(
  "en",
  "bot.feelings",
  "I'm just a bot, so I don't have feelings, but I'm here to assist you!"
);

nlpManager.addDocument("en", "Where are you from?", "bot.origin");
nlpManager.addAnswer(
  "en",
  "bot.origin",
  "I'm from the digital world, created to help and chat with you."
);

nlpManager.addDocument("en", "Do you like music?", "bot.music");
nlpManager.addAnswer(
  "en",
  "bot.music",
  "I can't listen to music, but I can provide music recommendations!"
);

nlpManager.addDocument("en", "Recommend me some songs", "bot.recommend");
nlpManager.addAnswer(
  "en",
  "bot.recommend",
  "So i think honey singh creates few amazing songs\nDo check it out"
);

nlpManager.addDocument("en", "What's your purpose?", "bot.purpose");
nlpManager.addAnswer(
  "en",
  "bot.purpose",
  "My purpose is to assist you, answer questions, and have conversations."
);

nlpManager.addDocument(
  "en",
  "Tell me something interesting.",
  "bot.interestingFact"
);
nlpManager.addDocument("en", "okay", "bot.general");
nlpManager.addAnswer("en", "bot.general", "Yeah!! So how are you?");
bot.start((ctx) => {
  // This code will execute when a user clicks on the bot's start link
  ctx.reply("Welcome to YourBot! How can I assist you today?");
});

bot.hears("Bot", (ctx) => ctx.reply("t.me/knock_the_bot"));

bot.on(message("sticker"), (ctx) => ctx.reply("😍🥰 please enter text"));

bot.on("text", async (ctx) => {
  const userMessage = ctx.message.text;

  // Use the trained NLP model to classify the user's question
  const classification = await nlpManager.process("en", userMessage);

  // Handle different classifications and generate responses accordingly
  if (classification.intent) {
    console.log("command", classification.intent);
    switch (classification.intent) {
      case "bot.feelings":
        ctx.reply(classification.answer);
        break;
      case "bot.general":
        ctx.reply(classification.answer);
        break;
      case "bot.recommend":
        ctx.reply(classification.answer);
        break;
      case "bot.origin":
        ctx.reply(classification.answer);
        break;
      case "bot.music":
        ctx.reply(classification.answer);
        break;
      case "bot.interestingFact":
        ctx.reply(classification.answer);
        break;
      case "bot.purpose":
        ctx.reply(classification.answer);
        break;
      case "bot.creator":
        ctx.reply(classification.answer);
        break;
      case "bot.capabilities":
        ctx.reply(classification.answer);
        break;
      case "bot.joke":
        ctx.reply(classification.answer);
        break;
      case "weather.current":
        ctx.reply(classification.answer);
        break;
      case "bot.favoriteColor":
        ctx.reply(classification.answer);
        break;
      // Handle more intents...
      default:
        ctx.reply(
          "I'm sorry, I don't know how to answer that question.\nI am under development mode so i have limited info so try questioning some basic question"
        );
    }
  } else {
    ctx.reply(
      "I'm sorry, I didn't understand your question.\nI am under development mode so i have limited info so try questioning some basic question"
    );
  }
});

console.log("bot is running");
nlpManager.train();
bot.launch();
