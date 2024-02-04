const WebSocket = require("ws");
const { startGeminiChat } = require("../gemini/getChat");

const wsServe = async () => {
  try {
    // const wss = new WebSocket.WebSocketServer({ port: 8001 });
    const wss = new WebSocket.Server({ noServer: true }); /// comment up and uncomment to host on render
    console.log("ws start");

    wss.on("connection", async (ws, req) => {
      const chat = startGeminiChat();

      ws.on("message", async (data) => {
        try {
          //   console.log(data);
          data = JSON.parse(data.toString());

          if (data?.type === "client:prompt") {
            // console.log(data.prompt);
            if (data.prompt === undefined) {
              // throw err
              return;
            }

            // Prompt by the user sent to gemini
            const result = await chat.sendMessageStream(
              `[AnimalGPT]: ${data.prompt}`
            );
            let respText = "";
            ws.send(JSON.stringify({ type: "server:response:start" }));

            for await (const chunk of result.stream) {
              const chunkText = chunk.text();

              ws.send(
                JSON.stringify({
                  type: "server:response:chunk",
                  chunk: chunkText,
                })
              );
              respText += chunkText;
            }
            ws.send(JSON.stringify({ type: "server:response:end" }));
          }
        } catch (error) {
          console.log(error);
        }
      });
      ws.on("close", () => {
        // console.log("cls");
      });
      ws.on("error", (error) => {
        console.error("WebSocket Error:", error.message);
      });
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { wsServe };
