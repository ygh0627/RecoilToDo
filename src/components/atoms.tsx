import { atom } from "recoil";

export interface ITodo {
  //객체의 타입 정의
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
  id: number;
}

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: [],
});
