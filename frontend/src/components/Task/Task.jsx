import React, { useState } from 'react';
import moment from 'moment';
import "./task.css";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';

function Task({ task, id }) {
 
    const [editable, setEditable] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleRemove = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:8000/deletetask/${task._id}`);
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    const handleEdit = () => {
        setEditable(true);
    }

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/updatetask/${task._id}`, editedTask);
            console.log(response.data);
            setEditable(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleMarkDone = async (e) => {
        try {
            const newCompleted = !task.completed;
            const response = await axios.put(`http://localhost:8000/updatecompleted/${task._id}`, { completed: newCompleted });
            console.log(response.data);
            // dispatch({
            //     type: "MARK_DONE",
            //     id
            // });
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    return (
        <div className='bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
            <div className="mark-done">
                <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
            </div>
            <div className="task-info text-slate-900 text-sm w-10/12">
                {editable ? (
                    <>
                        <input type="text" name="title" value={editedTask.title} onChange={handleChange} />
                        <input type="text" name="description" value={editedTask.description} onChange={handleChange} />
                    </>
                ) : (
                    <>
                        <h4 className="task-title text-lg capitalize">{task.title}</h4>
                        <p className="task-description">{task.description}</p>
                    </>
                )}
                <div className='italic opacity-60'>
                    {task?.createdAt ? (
                        <p>{moment(task.createdAt).fromNow()}</p>
                    ) : (
                        <p>just now</p>
                    )}
                </div>
            </div>
            <div className="flex flex-row remove-task text-sm text-white space-x-2 mr-4">
                {editable ? (
                    <CheckSharpIcon
                        style={{ fontSize: 30, cursor: "pointer" }}
                        size="large"
                        onClick={handleSave}
                        className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1" />
                ) : (
                    <button onClick={handleEdit}><EditIcon
                        style={{ fontSize: 30, cursor: "pointer" }}
                        size="large"
                        onClick={handleEdit}
                        className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1" /></button>
                )}
                <DeleteIcon
                    style={{ fontSize: 30, cursor: "pointer" }}
                    size="large"
                    onClick={handleRemove}
                    className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1" />
            </div>
        </div>
    );
}

export default Task;
