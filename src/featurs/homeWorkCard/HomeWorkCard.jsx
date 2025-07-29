import { IoIosArrowDown } from 'react-icons/io';
import './homeWorkCard.scss';

export const HomeWorkCard = ({ user, group, lesson }) => {
  return (
    <div className='card' >
      <div className='card_work'>
        <h3>{user}</h3>
        <p className='card_work_group'>{group}</p>

        <p>{lesson}</p>
      </div>
      <p className='row card_btn'>
        Расвернуть <IoIosArrowDown size={20} />
      </p>
    </div>
  );
};
