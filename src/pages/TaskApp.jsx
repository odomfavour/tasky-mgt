import { useState, useEffect } from 'react';
import AddTaskModal from '../components/AddTaskModal';
import { FaPlus } from 'react-icons/fa';
import avatar from '../assets/avatarr.png';
import EmptyState from '../components/EmptyState';
import { BsCheck2All } from 'react-icons/bs';
import SuccessModal from '../components/SuccessModal';

const TaskApp = () => {
  const storedTasks = localStorage.getItem('tasks');
  const initialTasks = storedTasks ? JSON.parse(storedTasks) : [];
  const [tasks, setTasks] = useState(initialTasks);

  // New state variables for editing
  const [editingTask, setEditingTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState({});
  // modal
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(false);
  };
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const markTaskAsComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const editTask = (task) => {
    setShowModal(true);
    setEditingTask(true);
    setTaskToEdit(task);
  };

  const currentDate = new Date();
  const dateToday = currentDate.toISOString().split('T')[0];
  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <div className=''>
        <div className='w-11/12 mx-auto'>
          <h1 className='text-center font-bold md:text-3xl text-2xl my-5'>
            Task Management App
          </h1>
          <div>
            {tasks.length > 0 && (
              <div className='flex justify-between items-center'>
                <div>
                  <h2 className='mb-3 font-semibold text-xl'>Tasks</h2>
                  <p className='mb-3'>
                    Click on the checkbok to mark task as completed
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setTasks([])}
                    className='text-blue-800 border-blue-800 border-2 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
                  >
                    Clear Tasks
                  </button>
                </div>
              </div>
            )}
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mb-20'>
              {tasks.map((task) => (
                <div
                  className={`drop-shadow-lg p-3 border border-grey rounded-md mb-5 relative flex flex-col justify-between`}
                  key={task.id}
                >
                  <div>
                    <div className='flex justify-between'>
                      <div className='flex gap-1 items-center'>
                        <input
                          type='checkbox'
                          checked={task.completed}
                          onChange={() => markTaskAsComplete(task.id)}
                        />
                        {task.completed ? (
                          <small className='text-green-800 font-semibold'>
                            Done
                          </small>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className=''>
                        <h5 className='text-xs text-gray-500'>
                          Due Date:{' '}
                          <span
                            className={`${
                              task.dueDate < dateToday
                                ? 'text-red-500 font-bold'
                                : ''
                            }`}
                          >
                            {task.dueDate}
                          </span>
                        </h5>
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <div className='w-11/12 overflow-clip'>
                        <h3 className='font-bold text-xl capitalize'>
                          {task.name}
                        </h3>
                        <p className='text-base mt-2'>{task.desc}</p>
                      </div>
                      <div className='w-1/10'>
                        {task.completed && (
                          <BsCheck2All className='text-green-800 md:text-2xl text-xl font-extrabold' />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between mt-5 items-center'>
                    <div>
                      <img
                        src={avatar}
                        alt='person avatar'
                        className='h-10 w-10 rounded-full bg-cover'
                      />
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => editTask(task)}
                        className='text-blue-800 border-blue-800 border-2 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center'
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {tasks.length < 1 && <EmptyState />}
          </div>
        </div>
        {showModal && (
          <AddTaskModal
            handleClose={closeModal}
            tasks={tasks}
            setTasks={setTasks}
            editingTask={editingTask}
            taskToEdit={taskToEdit}
            setEditingTask={setEditingTask}
            setShowSuccessModal={setShowSuccessModal}
          />
        )}
        {showSuccessModal && <SuccessModal handleClose={closeSuccessModal} />}
      </div>
      <div
        className='button-container lg:bottom-10 md:right-10 bottom-5 right-5 rounded-full border bg-blue-700 lg:w-20 lg:h-20 h-14 w-14  fixed flex justify-center items-center'
        role='button'
        onClick={() => setShowModal(true)}
      >
        <FaPlus className='text-white' />
      </div>
    </>
  );
};

export default TaskApp;
