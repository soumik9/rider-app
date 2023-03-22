import { atom } from "jotai";

export const joinStep = atom<string>('as-rider');
export const token = atom<string | undefined>(undefined);