import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ChatMessage {
    role: string;
    message: string;
}
export interface backendInterface {
    getChatHistory(phone: string): Promise<Array<ChatMessage>>;
    registerPhone(phone: string): Promise<boolean>;
    sendMessage(phone: string, message: string): Promise<string>;
    setTopic(phone: string, topic: string): Promise<void>;
}
