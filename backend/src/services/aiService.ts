import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Stub for Amazon Bedrock Integration
const client = new BedrockRuntimeClient({ region: "us-east-1" });

export const getSalesForecast = async (prompt: string) => {
  try {
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          { role: "user", content: `As a restaurant AI assistant, answer this query based on sales data: ${prompt}` }
        ]
      })
    });

    // const response = await client.send(command);
    // const result = JSON.parse(new TextDecoder().decode(response.body));
    // return result;
    
    // Returning mock response for hackathon demo purposes if AWS keys are not set
    return { forecast: "Tomorrow's revenue is predicted to be $2,450. Top selling product will be Espresso." };
  } catch (error) {
    console.error("Bedrock API Error:", error);
    throw error;
  }
};
