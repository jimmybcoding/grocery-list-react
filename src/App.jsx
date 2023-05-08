import { useEffect, useState } from "react"
import { GroceryForm } from "./GroceryForm"
import "./index.css"

export default function App() {
  const [groceries, setGroceries] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
     if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(groceries))
  }, [groceries])

  function addGroceries(title) {
    setGroceries(currentGroceries => {
      return [
        ...currentGroceries,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleGroceries(id, completed) {
    setGroceries(currentGroceries => {
      return currentGroceries.map(grocery => {
        if (grocery.id === id) {
          return { ...grocery, completed }
        }
        return grocery
      })
    })
  }

  function deleteGroceries(id) {
    setGroceries(currentGroceries => {
      return currentGroceries.filter(grocery => grocery.id !== id)
    })
  }

  return (
    <>
      <GroceryForm onSubmit={addGroceries} />
      <h1>Jimmy&apos;s Grocery List</h1>
      <ul>
        {groceries.length === 0 && "No groceries in the list"}
        {groceries.map(grocery => {
          return (
            <li key={grocery.id}>
             <label>
              <input type="checkbox" checked={grocery.completed} onChange={e => toggleGroceries(grocery.id, e.target.checked)}/>
              {grocery.title}
             </label>
             <button onClick={() => deleteGroceries(grocery.id)}>
              Delete
             </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}