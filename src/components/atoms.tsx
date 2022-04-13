import { atom, selector } from "recoil";

export const USERTODOLIST_KEY = "todos";
const userGetTodo = localStorage.getItem(USERTODOLIST_KEY);
const parseTodo = JSON.parse(userGetTodo as string);

export interface ITodo {
  //객체의 타입 정의
  text: string;
  category: Categories;
  id: number;
}
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export const toDoState = atom<ITodo[]>({
  key: "toDo",
  default: userGetTodo !== null ? parseTodo : [],
});

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
