export type User = {
    id?: string;
    login: string,
    password: string,
    credits?: number,
    role?: string
}

export type Icon = {
    id: string;
    type: string;
    name: string;
    url: string | null;
    path: string;
    size: number;
    created_at: string;
};

export type Pricing = {
    input: number;
    output: number;
    discount: number;
    input_image: number;
};

export type Parent = {
    order: number;
};

export type BothubModel = {
    id: string;
    label: string;
    description: string | null;
    icon_id: string;
    pricing: Pricing;
    auto_update_pricing: boolean;
    prefix: string;
    context_length: number;
    max_tokens: number;
    features: string[];
    provider_id: string;
    child_provider_id: string | null;
    owned_by: string;
    parent_id: string;
    message_color: string;
    disabled: boolean;
    disabledWeb: boolean;
    disabledTelegram: boolean;
    order: number;
    custom: boolean;
    created_at: string;
    icon: Icon;
    parent: Parent;
    functions: any[];
    is_allowed: boolean;
    allowed_plan_type: string;
    is_default: boolean;
};
