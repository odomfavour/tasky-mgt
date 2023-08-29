import { BsCheckCircleFill, BsXLg } from 'react-icons/bs';
// eslint-disable-next-line react/prop-types
const SuccessModal = ({ handleClose }) => {
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
        <div className='text-center '>
          <div>
            <div className='flex justify-center items-center'>
              <BsCheckCircleFill className='text-7xl text-green-600' />
            </div>
            <h5 className='text-lg mb-5'>Task Added successfully</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
