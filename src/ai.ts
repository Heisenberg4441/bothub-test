import OpenAI from "openai";
import { config } from "./config";
import { EventEmitter } from "events";
import axios from "axios";
import { ChatCompletionMessageParam } from "openai/resources";

export const chatEmitter = new EventEmitter();

const openai = new OpenAI({
    apiKey: `${config.OPENAI_KEY}`,
    baseURL: 'https://bothub.chat/api/v2/openai/v1'
})

export const requestToModel = async (text: string) => {
    const messages: ChatCompletionMessageParam[] = [{ role: 'user', content: `${text}` }]
    const fullMessage = JSON.stringify(messages)
    return {messages, fullMessage}
}

export async function main(text: string, model: string) {
    const stream = await openai.chat.completions.create({
        messages: (await requestToModel(text)).messages,
        model: `${model}`,
        stream: true
    });
    for await (const chunk of stream) {
        const part: string | null = chunk.choices[0].delta?.content ?? null;
        chatEmitter.emit('data', part);
    }

}

export const models = async () => {
    try {
        const response = await axios.get('https://bothub.chat/api/v2/model/list?children=1', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': config.OPENAI_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching models:', error);
        throw error;
    }
};