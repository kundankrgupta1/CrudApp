import { useEffect } from "react"
import { useState } from "react"
import { GrTask } from "react-icons/gr";
import { MdPendingActions } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import Loading from "./Loading";
import { FaPlus } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const TodoDisplay = () => {

	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");

	async function getData() {
		setLoading(true)
		try {
			const res = await fetch(`http://localhost:8080/todos?q=${search}`);
			const finalData = await res.json()
			setData(finalData)
			setLoading(false)
		} catch (error) {
			console.log(error);
			setLoading(false)
		}
	}

	useEffect(() => {
		const delay = setTimeout(() => {
			getData();
		}, 1000)
		return () => clearInterval(delay)
	}, [search])


	if (loading) {
		return <Loading />
	}

	return (
		<>
			<div className="flex m-auto justify-between items-center mb-10">
				<h1 className="text-4xl font-bold">TODO APP</h1>
				<div className='flex items-center border-2 rounded-md'>
					<input type="text" placeholder='Search Tasks' className='px-2 rounded-md bg-none outline-none py-2 h-full w-full' onChange={(e) => setSearch(e.target.value)} />
					<IoSearchSharp className='text-2xl bg-none' />
				</div>
				<div>
					<label htmlFor="">Assigned To: </label>
					<select placeholder="Assigned To" className='px-2 py-2 w-40 rounded-md'>
						{
							data.map((e, ind) =>
								<option key={ind} value={e.assigned}>{e.assigned}</option>
							)
						}
					</select>
				</div>
				<div>
					<label htmlFor="">Status: </label>
					<select placeholder="Assigned To" className='px-2 py-2 w-40 rounded-md'>
						{
							data.map((e, ind) =>
								<option key={ind} value={e.status}>
									{e.status ? "Completed" : "Pending"}
								</option>
							)
						}
					</select>
				</div>

				<Link to="/addtodo"><button className="flex items-center gap-2 text-xl px-2 -py-2"><FaPlus /> Add Task</button></Link>
			</div>
			<div className="basis-2/3 w-full">
				<table className="m-auto w-full border-collapse text-xl text-left">
					<tbody>
						{
							data.map((e, ind) =>
								<tr key={ind} className="flex shadow-md gap-7 text-xl items-center justify-between p-2 mb-2">
									<td className="flex items-center gap-3 font-bold capitalize">
										<GrTask />{e.task}
									</td>
									<td className="flex items-center gap-3 capitalize">
										<FaRegUser />{e.assigned}
									</td>
									<td className="flex items-center gap-3">
										<IoMdTime />Due Date: {e.date}
									</td>
									<td className="flex items-center gap-3" style={e.status ? { color: "green" } : { color: "red" }}>
										{e.status ? <IoCheckmarkDoneCircleOutline /> : <MdPendingActions />}
										{e.status ? "Completed" : "Pending"}
									</td>
									<td className="flex items-center gap-3">
										<button className="bg-blue-500 text-white px-4 py-1"><FaEdit /></button>
									</td>
									<td className="flex items-center gap-3">
										<button className="bg-red-500 text-white px-4 py-1"><MdDelete /></button>
									</td>
								</tr>
							)
						}
					</tbody>
				</table>

			</div>
		</>
	)
}
// onClick={() => setOpen(true)}
export default TodoDisplay
