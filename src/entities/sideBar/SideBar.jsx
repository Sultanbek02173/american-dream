import { useNavigate } from 'react-router-dom';
import './sideBar.scss';
import { IoIosArrowBack } from "react-icons/io";
import { removeRole } from '../../shared/hooks/auth';

export const SideBar = () => {
    const navigate = useNavigate();

    const handlerLogaut = () => {
        removeRole();
        navigate('/login');
        window.location.reload();
    }
    return (
        <aside className="sideBar">
            <h2 className='logo'>AD</h2>

            <div className='accaunts'>
                <div className='accaunts_main'>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <h2>Дмитрий</h2>
                        <p>000000000000@gmai.com</p>
                    </div>
                    <div>

                    </div>
                </div>
                <div className='accaunts_logout'>
                    <IoIosArrowBack color='#fff' />
                    <button onClick={handlerLogaut}>Выйти с аккаунта</button>
                </div>
            </div>
        </aside>
    );
}

