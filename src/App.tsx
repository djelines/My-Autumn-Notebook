import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import TodoBg from "./TodoBg";

type Priority = "Urgente" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
};

function App() {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Moyenne");
  const savedTodos = localStorage.getItem("todos");
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (input.trim() == "") {
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
    };

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriority("Moyenne");
    console.log(newTodos, todos);
  }

  let filteredTodos: Todo[] = todos;

  
  if (filter !== "Tous") {
    filteredTodos = filteredTodos.filter((todo) => todo.priority === filter);
  }

  
  if (searchTerm.trim() !== "") {
    const lowerSearch = searchTerm.toLowerCase();
    filteredTodos = filteredTodos.filter((todo) =>
      todo.text.toLowerCase().includes(lowerSearch)
    );
  }

  const urgentCount = todos.filter((t) => t.priority === "Urgente").length;
  const mediumCount = todos.filter((t) => t.priority === "Moyenne").length;
  const lowCount = todos.filter((t) => t.priority === "Basse").length;
  const totalCount = todos.length;

  function deleteTodo(id: number) {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  function toggleSelectedTodo(id: number) {
    const newSelected = new Set(selectedTodos);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedTodos(newSelected);
  }

  function finishSelected() {
    const newTodos = todos.filter((todo) => {
      if (selectedTodos.has(todo.id)) {
        return false;
      } else {
        return true;
      }
    });

    setTodos(newTodos);
    setSelectedTodos(new Set());
  }

  return (
    <>
      <div className="relative min-h-screen  flex items-center justify-center p-6 overflow-hidden">
        <TodoBg />

        <div className="w-full max-w-5xl bg-base-100/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8">
          {/* Titre */}
          <h1 className="text-5xl font-extrabold mb-10 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient drop-shadow-lg">
            Mon Carnet Automnal
          </h1>

          {/* Barre d'ajout flottante */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-base-300 items-center">
            <input
              type="text"
              className="input flex-grow rounded-full bg-base-300 border border-base-400 focus:outline-none focus:ring-2 focus:ring-primary placeholder-base-content/50 text-base-content"
              placeholder="Ajoutez une tâche..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <label
                htmlFor="priority"
                className="text-base-content font-semibold text-sm mb-1 sm:mb-0 sm:mr-2"
              >
                Priorité
              </label>

              <select
                id="priority"
                className="select select-bordered rounded-full bg-base-300 border border-base-400 text-base-content w-full sm:w-auto focus:ring-2 focus:ring-primary"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value="Urgente">Urgente</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </div>

            <button
              className="btn rounded-full bg-gradient-to-r from-primary to-secondary text-primary-content font-semibold shadow-lg hover:scale-105 transition flex items-center gap-2 px-6"
              onClick={addTodo}
            >
              <PlusCircle className="w-5 h-5" />
              Ajouter
            </button>
          </div>

          {/* Filtres + suppression sur même ligne */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Tous", color: "" },
                { label: "Urgente", color: "bg-error" },
                { label: "Moyenne", color: "bg-warning" },
                { label: "Basse", color: "bg-success" },
              ].map(({ label, color }) => (
                <button
                  key={label}
                  className={`btn btn-outline rounded-full flex items-center gap-1 ${
                    filter === label ? "btn-primary" : "btn-ghost"
                  }`}
                  onClick={() => setFilter(label as any)}
                >
                  {label}{" "}
                  {label === "Tous"
                    ? `(${totalCount})`
                    : label === "Urgente"
                    ? `(${urgentCount})`
                    : label === "Moyenne"
                    ? `(${mediumCount})`
                    : `(${lowCount})`}
                  {color && (
                    <span
                      className={`w-3 h-3 rounded-full ml-1 ${color}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={finishSelected}
              disabled={selectedTodos.size === 0}
              className="btn btn-error btn-outline rounded-full"
            >
              Supprimer la sélection ({selectedTodos.size})
            </button>
          </div>

          <label className="input mb-4">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              className="grow"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </label>

          {/* Liste */}
          {filteredTodos.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={() => deleteTodo(todo.id)}
                  isSelected={selectedTodos.has(todo.id)}
                  onToggleSelect={toggleSelectedTodo}
                />
              ))}
            </ul>
          ) : (
            <img
              className="w-61 mx-auto block"
              src="src/assets/todo.svg"
              alt="img"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
