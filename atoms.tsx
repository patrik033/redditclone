import { atom } from 'jotai';
import { Group } from "./src/types";

export const selectedGroupAtom = atom<Group | null>(null);