/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { BsXLg } from 'react-icons/bs';

const AddTaskModal = ({
  handleClose,
  tasks,
  setTasks,
  editingTask,
  taskToEdit,
  setEditingTask,
  setShowSuccessModal,
}) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const currentDate = new Date().toISOString().split('T')[0];

  // Set initial values based on editingTask
  useEffect(() => {
    if (editingTask) {
      setNewTaskName(taskToEdit.name);
      setNewTaskDueDate(taskToEdit.dueDate);
      setNewTaskDesc(taskToEdit.desc);
    }
  }, [editingTask, taskToEdit.name, taskToEdit.dueDate, taskToEdit.desc]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTaskName && newTaskDueDate) {
      if (editingTask) {
        // Update existing task
        const updatedTasks = tasks.map((task) =>
          task.id === taskToEdit.id
            ? {
                ...task,
                name: newTaskName,
                dueDate: newTaskDueDate,
                desc: newTaskDesc,
              }
            : task
        );
        setTasks(updatedTasks);
        setEditingTask(false);
      } else {
        // Add new task
        const newTask = {
          id: Date.now(),
          name: newTaskName,
          desc: newTaskDesc,
          dueDate: newTaskDueDate,
          completed: false,
        };
        setTasks([...tasks, newTask]);
      }
      handleClose();
      setShowSuccessModal(true);
    }
  };
  return (
    <div
      onClick={handleClose}
      className='z-40 top-0 min-h-screen bg-[#101010c8] fixed w-full flex justify-center items-center'
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='lg:w-1/3 w-11/12 bg-white rounded-[5px] shadow-authModal p-8'
      >
        <div className='flex justify-end'>
          <BsXLg
            className='cursor-pointer'
            role='button'
            onClick={handleClose}
          />
        </div>
        <div className=''>
          <h2 className='mb-4 font-semibold'>Add New Task</h2>
          <form onSubmit={addTask}>
            <div className='mb-6'>
              <label
                htmlFor='taskName'
                className='block mb-2 text-sm font-medium text-gray-90'
              >
                Task Name
              </label>
              <input
                type='text'
                placeholder='Task Name'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                required
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='message'
                className='block mb-2 text-sm font-medium text-gray-90'
              >
                Your Description
              </label>
              <textarea
                id='message'
                rows='4'
                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Write your description here...'
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
                required
              ></textarea>
            </div>
            <div className='mb-6'>
              <label
                htmlFor='dueDate'
                className='block mb-2 text-sm font-medium text-gray-90'
              >
                Due Date
              </label>
              <input
                type='date'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                min={currentDate}
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
              >
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
