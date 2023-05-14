import { IMessage } from "../types";

export let ChatModal: IMessage[] = [];
export const clearChats = () => {
  ChatModal = [];
};
