import React from 'react';
import {User} from '../../types';
import {useAppDispatch} from '../../app/hooks';
import {API_URL} from '../../constants';
import {logout} from '../../store/usersThunks';
import {NavLink} from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();

  let userPhoto = `${API_URL}/${user.avatar}`;
  if (user.googleId) {
    userPhoto = user.avatar;
  }

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="dropdown">
      <button className="dropdown-toggle btn btn-success d-flex align-items-center p-0" data-bs-toggle="dropdown">
        <img src={userPhoto} alt={user.displayName} className="rounded-5 me-2" style={{width: '40px'}}/>
        Hello, {user.displayName}
      </button>
      <ul className="dropdown-menu">
        <li><NavLink to="/new-cocktail" className="dropdown-item">Add cocktail</NavLink></li>
        <li><NavLink to='/my-cocktails' className="dropdown-item">My cocktails</NavLink></li>
        <li>
          <hr className="dropdown-divider"/>
        </li>
        <li>
          <button className="dropdown-item" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;