import { Link } from 'react-router-dom';
import { logoImg } from '../../utils';

const Nav = () => {
  return (
    <nav className="p-20 bg-white">
      <div className="flex justify-between screen-max-width items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl text-blue-600 tracking-wider font-bold">RocketCards</span>
          <img src={logoImg} alt="logo" width={30} className="mx-10" />
        </Link>
        <div>
          <Link to="/login" className="tracking-wider font-bold mx-20">
            <button className="button-class hover:button-class_hover">zaloguj się</button>
          </Link>
          <Link to="/register" className="tracking-wider font-bold">
            <button className="button-class second-button hover:second-button_hover">stwórz konto</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
