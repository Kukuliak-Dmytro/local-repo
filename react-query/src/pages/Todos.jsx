import { useEffect, useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import PageWrapper from "../layouts/PageWrapper";
import { getTodos } from "../services/todos";
import useFormState from "../hooks/useFormState";
import useTodos from "../hooks/useTodos";
import TodoCard from "../components/cards/TodoCard";
import { useQuery } from "@tanstack/react-query";
export default function TodosPage() {
    // const [todos, setTodos] = useState([]);
    const [formData, setFormData, handleChange] = useFormState({
        "title": "",
        "description": ""
    })
    const {createTodoMutation} = useTodos()
    const query = useQuery
        ({
            queryKey: ['getTodos'],
            queryFn: getTodos,
            staleTime: 1000 * 60 * 5,
        })

    const handleSubmit = async (e) => {
        e.preventDefault()
        createTodoMutation(formData)
        setFormData({ title: "", description: "" })
    }
    return (
        <PageWrapper className="flex flex-col gap-16">
            <div className="flex flex-col gap-4 max-w-[900px] text-center">
                <h1 className="text-2xl font-bold pb-4">Add a todo list</h1>
                <form onSubmit={handleSubmit} className="add-todo flex gap-2 items-center p-8 border-2 border-amber-300 rounded-md bg-gray-100">
                    <Input
                        type="text"
                        placeholder="Title"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <Input
                        type="text"
                        placeholder="Description"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <Button type="submit">Add Todo</Button>
                </form>
                <ul className="flex flex-col gap-4">
                    {query.data?.map((todo) => (
                        <TodoCard key={todo.id} Todo={todo}></TodoCard>
                    ))}
                </ul>
            </div>
        </PageWrapper>
    )
}