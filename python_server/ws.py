import asyncio
import websockets
import google.generativeai as genai

def call_gemini(input_text):
    model = genai.GenerativeModel(model_name="gemini-pro")
    response = model.generate_content(input_text)
    return response.text

async def handle_websocket(websocket, path):
    try:
        while True:
            message = await websocket.recv()
            print(f"Received message: {message}")

            response = call_gemini(message)
            
            await websocket.send(response)

    except websockets.exceptions.ConnectionClosedOK:
        print("WebSocket connection closed gracefully.")

async def main():
    # Set up the WebSocket server
    server = await websockets.serve(
        handle_websocket,
        "localhost",  # Change this to your desired host
        8765        # Change this to your desired port
    )
    print("WebSocket server started.")

    # Keep the server running
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())