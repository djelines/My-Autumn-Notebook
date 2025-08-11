import { Trash } from "lucide-react"

type Priority = "Urgente" | "Moyenne" | "Basse"


type Todo = {
  id: number, 
  text: string,
  priority : Priority, 
}

type Props =  {
    todo : Todo
    onDelete : () => void 
    isSelected : boolean 
    onToggleSelect: (id:number) => void
}



const TodoItem = ({ todo, onDelete, isSelected , onToggleSelect}: Props) => {
    

    return (
    <li
  className={`relative rounded-2xl shadow-lg border p-4 pb-10 flex flex-col gap-3 transition hover:scale-[1.02] hover:shadow-xl ${
    todo.priority === "Urgente"
      ? "bg-primary/30 border-primary"
      : todo.priority === "Moyenne"
      ? "bg-secondary/30 border-secondary"
      : "bg-accent/30 border-accent"
  }`}
  style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
>
  <span
    className={`absolute top-2 right-2 badge badge-sm text-black border-none ${
      todo.priority === "Urgente"
        ? "bg-error"
        : todo.priority === "Moyenne"
        ? "bg-warning"
        : "bg-success"
    }`}
  >
    {todo.priority}
  </span>

  <label className="flex items-start gap-2 pt-3">
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => onToggleSelect(todo.id)}
      className="checkbox checkbox-primary mt-1"
    />
    <span
      className="font-medium text-base-content whitespace-pre-wrap"
      style={{ maxWidth: "100%", overflowWrap: "break-word", wordBreak: "break-word" }}
    >
      {todo.text}
    </span>
  </label>

  <button
    onClick={onDelete}
    className="btn btn-xs btn-error btn-outline rounded-full absolute bottom-2 right-2"
  >
    <Trash className="w-4 h-4" />
  </button>
</li>
    );
}

export default TodoItem