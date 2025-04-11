import { Link } from 'react-router-dom';
import { logoWhiteImg } from '../../utils';

const Nav = () => {
  return (
    <nav className="fixed w-full p-20 bg-blue-600 z-10">
      <div className="flex justify-between screen-max-width items-center">
        <Link to="/" className="flex items-center">
          <span className="text-xl text-white tracking-wider font-bold">RocketCards</span>
          <img src={logoWhiteImg} alt="logo" width={30} className="mx-10" />
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
