import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState, USERTODOLIST_KEY } from "./atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const toDoSave = useRecoilValue(toDoState);
  const setTodos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const category = useRecoilValue(categoryState);
  const handleValid = ({ toDo }: IForm) => {
    setTodos((oldToDos) => [{ text: toDo, id: Date.now(), category }]);
    console.log(toDoSave);
    setValue("toDo", "");
  };
  localStorage.setItem(USERTODOLIST_KEY, JSON.stringify(toDoSave));
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
