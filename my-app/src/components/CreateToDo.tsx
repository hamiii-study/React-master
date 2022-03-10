import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

export interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    console.log(toDo);
    // setError("extraError", { message: "Server offline." });
    setToDos((oldToDos) => {
      const fStorage = oldToDos.filter((toDo) => toDo.category === category);
      console.log(fStorage);
      const storage = [{ text: toDo, id: Date.now(), category }, ...fStorage];
      localStorage.setItem(category, JSON.stringify(storage));

      setValue("toDo", "");
      return [{ text: toDo, id: Date.now(), category }, ...oldToDos];
    });
  };
  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="toDo"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
