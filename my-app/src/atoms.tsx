import { atom, selector } from "recoil";

// type categories = "TO_DO" | "DOING" | "DONE";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "DELETE" = "DELETE",
}

export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}
export interface INCateory {
  text: string;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const storageToDos = localStorage.getItem("");
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const newCategories = atom<INCateory[]>({
  key: "newCategories",
  default: [],
});
