import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, newCategories, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  //   const onClick = (newCategory: IToDo["category"]) => {};
  //   return (
  //     <li>
  //       <span>{text}</span>
  //       {category !== "DOING" && (
  //         <button onClick={() => onClick("DOING")}>Doing</button>
  //       )}
  //       {category !== "TO_DO" && (
  //         <button onClick={() => onClick("TO_DO")}>To Do</button>
  //       )}
  //       {category !== "DONE" && (
  //         <button onClick={() => onClick("DONE")}>Done</button>
  //       )}
  //     </li>
  //   );
  // }

  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      console.log(oldToDo, newToDo);

      const fStorage = oldToDos.filter((toDo) => toDo.category === name);
      const aStorage = [
        { text, id: Date.now(), category: name as any },
        ...fStorage,
      ];
      localStorage.setItem(name, JSON.stringify(aStorage));

      const cStorage = oldToDos.filter((toDo) => toDo.category === category);
      const cTargetIndex = cStorage.findIndex((toDo) => toDo.id === id);
      const newToDos = [
        ...cStorage.slice(0, cTargetIndex),
        ...cStorage.slice(cTargetIndex + 1),
      ];
      localStorage.setItem(category, JSON.stringify(newToDos));

      // const rStorage = [{ text, id: Date.now(), category }, ...newToDos];
      // console.log(oldToDos);
      // localStorage.setItem(category, JSON.stringify(rStorage));

      // to_do -> done 1.to_do에서 done으로 간애를 빼!
      //2.done을 따로 만들어!
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING && (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      )}

      <button name={Categories.DELETE} onClick={onClick}>
        Delete
      </button>
    </li>
  );
}

export default ToDo;
