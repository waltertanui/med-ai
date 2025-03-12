const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GroqResponse {
  id: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function sendMessageToGroq(
  messages: GroqMessage[],
  model: string = 'llama3-70b-8192'
): Promise<string> {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`);
    }

    const data: GroqResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
}

export async function getHealthPrediction(symptoms: string): Promise<string> {
  const messages: GroqMessage[] = [
    {
      role: 'system',
      content: 'You are a helpful AI assistant that provides preliminary health assessments based on symptoms. Always remind users to consult with a healthcare professional for proper diagnosis.'
    },
    {
      role: 'user',
      content: `Based on these symptoms, what might be the potential health conditions? Symptoms: ${symptoms}`
    }
  ];

  return sendMessageToGroq(messages);
}