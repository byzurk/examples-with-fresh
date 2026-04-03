import { Handlers } from "$fresh/server.ts";

const API_KEY = "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"; // PUT YOUR ANTHROPIC API KEY HERE

export const handler: Handlers = {
  async POST(req) {
    // Handle CORS
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    try {
      const { message } = await req.json();

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 500,
          messages: [{ role: "user", content: message }],
        }),
      });

      const data = await response.json();

      return new Response(
        JSON.stringify({
          response: data.content[0].text,
          success: true,
        }),
        { headers }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          response: "Error: " + error.message,
          success: false,
        }),
        { status: 500, headers }
      );
    }
  },
};
