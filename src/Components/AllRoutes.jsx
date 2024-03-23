import { Route, Routes } from "react-router-dom"
import TodoInput from "./TodoInput"
import Home from "./Home"

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/addtodo" element={<TodoInput />} />
		</Routes>
	)
}

export default AllRoutes
