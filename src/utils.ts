import { encode } from "gpt-3-encoder";
import { sql } from "./config";
import { encoding_for_model } from "tiktoken";
import { models } from "./ai";
import { BothubModel } from "./types";


export const checkUserAuth = async (login: string, password: string) => {
    const check_result = await sql`
    SELECT * FROM users WHERE login=${login} AND password=${password}
    `
    try {
        if (check_result[0].id) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        return false;
    }

}

export const getUserGeneratingData = async (login: string, password: string) => {
    const check_result = await sql`
    SELECT * FROM users WHERE login=${login} AND password=${password}
    `

    if (check_result[0].id) {
        const id = check_result[0].id;
        const credits = check_result[0].credits;
        return {
            id: Number(id),
            credits: Number(credits)
        };
    } else {
        return false;
    }
}

export const checkTokensInMessage = async (text: string) => {
    const encoder = encoding_for_model('gpt-3.5-turbo');
    const tokens = encoder.encode(text);
    return tokens.length;
}

export const checkCost = async (tokens: number, id: number, userCredits: number, model_name: string) => {
    const model = await checkModel(model_name);
    if (!model) {
        return false;
    }
    if (!model.pricing || model.pricing.input === undefined) {
        return false;
    }

    const model_input_price_in_caps = model.pricing.input * tokens;
    if (userCredits - model_input_price_in_caps >= 0) {
        return {
            input: model.pricing.input as number,
            output: model.pricing.output as number,
        }
    } else {
        return false;
    }
}

export const checkModel = async (model: string) => {
    const models_list = await models();
    const foundModel: BothubModel = models_list.find((elem: BothubModel) => elem.id === model);
    if (foundModel) {
        return {
            id: foundModel.id,
            pricing: foundModel.pricing
        };
    } else {
        return null;
    }
};

export const sumTokens = async (tokens_before: number, tokens_after: number, id: number) => {
    const response = await sql`
    UPDATE users
    SET credits=credits-${tokens_before + tokens_after}
    WHERE id=${id}`
    return response;
}