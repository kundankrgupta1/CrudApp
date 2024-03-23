import axios from "axios";
import { useState } from "react"
import { Link } from "react-router-dom";


const TodoInput = () => {
	const [task, setTask] = useState("");
	const [assigned, setAssigned] = useState("");
	const [date, setDate] = useState("");
	const [status, setStatus] = useState(false);
	const [msg, setMsg] = useState("")


	const handleSubmit = async (e) => {
		e.preventDefault()

		axios({
			method: "POST",
			baseURL: "http://localhost:8080",
			url: "/todos",
			data: {
				task,
				assigned,
				date,
				status
			}
		}).catch((err) => { console.log(err) })

		setTask("")
		setAssigned("")
		setDate("")
		setStatus(false)
		setMsg("Task Added Successfully")
	}

	return (
		<div className="basis-1/3">
			<form onSubmit={handleSubmit}>
				<table className="m-auto w-2/4 border-collapse text-xl text-left">
					<tbody>
						<tr>
							<td>Task:</td>
							<td><input type="text" name="task" placeholder="Add Task" value={task} onChange={(e) => setTask(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Assigned to:</td>
							<td><input type="text" name="assigned" placeholder="Assigned To" value={assigned} onChange={(e) => setAssigned(e.target.value)} /></td>
						</tr>
						<tr>
							<td>Due Date:</td>
							<td>
								<input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
							</td>
						</tr>
						<tr>
							<td>Status:</td>
							<td>
								<div className="flex">
									<input type="checkbox" name="status" checked={status} onChange={(e) => setStatus(e.target.checked)} />&nbsp;
									<label>Is Complted</label>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<button type="submit">Submit</button>
			</form>
			<p>{msg}</p>
			<Link to="/" className="text-xl">Go Back</Link>
		</div>
	)
}

export default TodoInput

/*
const formData = new FormData(e.target)
const data = Object.fromEntries(formData.entries())
await axios({
method: "POST",
baseURL: "http://localhost:8080",
url: "/todos",
data
}).then((res) => console.log(res)).catch((err) => console.log(err))
*/