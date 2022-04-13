import { useRecoilValue } from "recoil";
import { toDoState } from "./atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  console.log(toDos);
  return (
    <div>
      <CreateToDo />
      <ul>
        {toDos.map((item) => (
          <ToDo key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
