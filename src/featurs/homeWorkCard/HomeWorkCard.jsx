import { IoIosArrowDown } from 'react-icons/io';
import './homeWorkCard.scss';

export const HomeWorkCard = ({ user, group, lesson, status }) => {
  return (
    <div
      className={`row card ${status}`}
    >
      <div className='card_user'>
        <h3>{user}</h3>
        <p className='card_user_phone'>{group}</p>

        <p>{lesson}</p>
      </div>
      <p className='row card_btn'>
        Расвернуть <IoIosArrowDown size={20} />
      </p>
    </div>
  );
};
