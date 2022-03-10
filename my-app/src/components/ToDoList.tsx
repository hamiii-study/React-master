import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  Categories,
  categoryState,
  newCategories,
  toDoSelector,
  toDoState,
  IToDo,
} from "../atoms";
import CreateToDo, { IForm } from "./CreateToDo";
import GetData from "./GetData";
import ToDo from "./ToDo";
import styled from "styled-components";

// function ToDoList() {
//   const [toDo, setToDo] = useState("");
//   const [toDoError, setToDoError] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDo(value);
//     setToDoError("");
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError("To do should be longer");
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//         {toDoError !== "" ? toDoError : null}
//       </form>
//     </div>
//   );
// }

// interface keys {
//   name: string;
// }
const Body = styled.div`
  width: 300px;
  height: 70vh;
  margin: 40px auto;
  border: solid 2px white;
`;
const Header = styled.header`
  width: 100%;
  height: 10%;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 40px;
`;

function ToDoList() {
  // const toDos = useRecoilValue(toDoState); //빈 array
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   setError,
  // } = useForm<IForm>();
  let toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const [nCategory, setnCategory] = useState("");
  const [nCategorys, setnCategorys] = useRecoilState(newCategories);

  // let keyArray: keys[] = [];
  // let toDosArray: IToDo[] = [];
  // let i = 0;
  // let j = 0;
  // const onKeyIndex = () => {
  //   while (i <= 3) {
  //     if (localStorage.key(i) !== null) {
  //       let key = localStorage.key(i);
  //       keyArray.push(key as any);
  //       for (j = 0; j <= 3; j++) {
  //         let keyValue = keyArray[i];
  //         let values = localStorage.getItem(keyValue as any);
  //         let storagetoDos = JSON.parse(values as any);
  //         if (storagetoDos[j] === undefined) {
  //           break;
  //         } else {
  //           toDosArray.push(storagetoDos[j]);
  //         }
  //       }
  //     } else if (localStorage.key(i) === null) {
  //       break;
  //     }
  //     i += 1;
  //   }
  //   console.log(keyArray);
  //   console.log(toDosArray);

  //   return [...toDosArray];
  // };

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setnCategory(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setnCategory("");
    setnCategorys((prev) => [{ text: nCategory }, ...prev]);
    console.log(nCategorys);
  };

  return (
    <Body>
      <Header>
        <Title>To Dos</Title>
      </Header>
      <hr />

      <h2>Add a categories</h2>

      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={nCategory}></input>
        <button>Add</button>
      </form>
      <ul>
        {nCategorys?.map((nCategory) => (
          <li key={nCategory.text}>{nCategory.text}</li>
        ))}
      </ul>

      <hr />
      {/* <h2>Get the toDos from localStroage</h2>
      <button onClick={onKeyIndex}>Get the data</button> */}
      <GetData />
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>TO DO</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {nCategorys?.map((nCategory) => (
          <option key={nCategory.text}>{nCategory.text}</option>
        ))}
      </select>
      {/* localStorage에 있는 자료 가져오기! (구현 실패)*/}
      {/* <ul>
        {alreadyExists?.map((element) => (
          <li>{element.text}</li>
        ))}
      </ul> */}

      <CreateToDo />
      {/* {toDosArray?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))} */}
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Body>
  );
}
export default ToDoList;
