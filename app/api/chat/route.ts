import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, messages } = await request.json();

    // n8n Chat Trigger URL
    const chatUrl = "https://jpinnmobiliar.app.n8n.cloud/webhook/c3a24d51-aa0d-43ba-beb8-e9dc262af213/chat";

    console.log("Sending to n8n Chat Trigger:", chatUrl);
    console.log("Message:", message);

    // Chat Trigger expects this specific format
    const response = await fetch(chatUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "sendMessage",
        sessionId: `session-${Date.now()}`,
        chatInput: message,
      }),
    });

    console.log("n8n response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("n8n error response:", errorText);

      let errorMessage = `n8n webhook returned ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.message) {
          errorMessage = errorJson.message;
        }
        if (errorJson.hint) {
          errorMessage += ` - ${errorJson.hint}`;
        }
      } catch (e) {
        errorMessage += `: ${errorText}`;
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("n8n response data:", data);

    // Chat Trigger returns { "output": "..." }
    const assistantMessage = data.output || data.message || "No response from agent";

    return NextResponse.json({
      message: assistantMessage,
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process message", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
