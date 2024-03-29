import { SideType, SquareType } from "@do/lib";

export class SquareFactory {
    public static create(top: SideType, right: SideType, bottom: SideType, left: SideType): SquareType {
        return { top, right, bottom, left, owner: null };
    }
}