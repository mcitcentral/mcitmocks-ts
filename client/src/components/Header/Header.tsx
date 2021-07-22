import React, { useRef, useState } from "react";
import GoogleLogin from "react-google-login";
import { FcMenu, FcGoogle } from "react-icons/fc";
import { FaInbox } from "react-icons/fa";

import "./Header.scss";
import InvitationList from "../InvitationList/InvitationList";
import { InterviewWithUserInfo } from "../../../../@types";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import MenuDropdown from "./MenuDropdown";
import { useEffect } from "react";

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
  invitations: InterviewWithUserInfo[];
  isAuthenticated: boolean;
  onLogin: (accessToken: string) => void;
  handleLogout: () => void;
  handleConfirmInterview: (interviewId: string) => void;
  handleRejectInterview: (interviewId: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  isAuthenticated,
  onLogin,
  invitations,
  handleLogout,
  handleConfirmInterview,
  handleRejectInterview,
}) => {
  const onSuccess = async (res: any) => onLogin(res.tokenId);

  const inboxRef = useRef<HTMLDivElement>(null);
  const [isInboxActive, setIsInboxActive] = useState<boolean>(false);
  const toggleInbox = () => setIsInboxActive((prev) => !prev);
  useOnClickOutside(inboxRef, () => setIsInboxActive(false));
  useEffect(() => {
    if (invitations.length === 0) setIsInboxActive(false);
  }, [invitations]);

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const toggleMenu = () => setIsMenuActive((prev) => !prev);
  useOnClickOutside(menuRef, () => setIsMenuActive(false));

  return (
    <header className="header">
      <div className="header__left">
        <span>_mcitmocks</span>
      </div>
      <div className="header__right">
        {isAuthenticated ? (
          <>
            {isInboxActive && (
              <InvitationList
                ref={inboxRef}
                invitations={invitations}
                handleConfirmInterview={handleConfirmInterview}
                handleRejectInterview={handleRejectInterview}
              />
            )}
            {isMenuActive && <MenuDropdown ref={menuRef} handleLogout={handleLogout} />}
            <button className="header__button" disabled={invitations.length === 0} onClick={toggleInbox}>
              <FaInbox color="white" size={25} />
            </button>
            <button className="header__button" onClick={toggleMenu}>
              <FcMenu color="white" size={25} />
            </button>
          </>
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