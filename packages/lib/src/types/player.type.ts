import { ColorType } from "./color.type";

export type PlayerType = {
    id: string;
    score: number;
    name: string;
    color: ColorType;
    isAdmin: boolean;
    winner: boolean;
}