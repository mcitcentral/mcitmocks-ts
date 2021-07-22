import React from "react";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";

import "./Header.scss";

interface LoginButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className="loginButton" disabled={disabled} onClick={onClick}>
      <FcGoogle size={25} />
      Login with Google
    </button>
  );
};

export interface HeaderProps {
  isAuthenticated: boolean;
  onLogin: (accessToken: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogin }) => {
  const onSuccess = async (res: any) => onLogin(res.tokenId);

  return (
    <header className="header">
      <div className="header__left">
        <span>_mcitmocks</span>
      </div>
      <div className="header__right">
        {isAuthenticated ? (
          <div>Test</div>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
            onSuccess={onSuccess}
            hostedDomain="seas.upenn.edu"
            render={(renderProps) => <LoginButton onClick={renderProps.onClick} disabled={renderProps.disabled} />}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
export {LoginButton};