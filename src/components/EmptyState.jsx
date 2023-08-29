import noTask from '../assets/notasky.jpg';
const EmptyState = () => {
  return (
    <div className='text-center'>
      <h3 className='text-center lg:mt-20 mt-10'>
        You have no tasks currently. Please click on the button at the right
        corner to add tasks
      </h3>
      <div className='flex justify-center items-center mt-5'>
        <img src={noTask} alt='' className='lg:w-1/3 md:w-1/2 w-full' />
      </div>
    </div>
  );
};

export default EmptyState;
