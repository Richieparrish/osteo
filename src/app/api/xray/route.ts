import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, UIMessage } from 'ai';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages: modelMessages,
    system: 'Analyze the provided skeletal image. Identify the bone type. Detect any abnormalities like Scoliosis, Osteoarthritis, or other defects. Provide short, straightforward feedback.',
  });

  return result.toUIMessageStreamResponse();
}
