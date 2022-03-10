import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IToDo, toDoState } from "../atoms";

export interface IForm {
  toDo: string;
}

interface keys {
  name: string;
}

function GetData() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    let keyArray: keys[] = [];
    let toDosArray: IToDo[] = [];
    let i = 0;
    let j = 0;

    while (i <= 3) {
      if (localStorage.key(i) !== null) {
        let key = localStorage.key(i);
        keyArray.push(key as any);
        for (j = 0; j <= 3; j++) {
          let keyValue = keyArray[i];
          let values = localStorage.getItem(keyValue as any);
          let storagetoDos = JSON.parse(values as any);
          if (storagetoDos[j] === undefined) {
            break;
          } else {
            toDosArray.push(storagetoDos[j]);
          }
        }
      } else if (localStorage.key(i) === null) {
        break;
      }
      i += 1;
    }
    console.log(keyArray);
    console.log(toDosArray);

    // setError("extraError", { message: "Server offline." });
    setToDos((oldToDos) => {
      return [...toDosArray];
    });
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <h2>Get the toDos from localStroage</h2>
      <button>Get the data</button>
    </form>
  );
}

export default GetData;
