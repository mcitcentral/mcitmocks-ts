import GoogleLogin from "react-google-login";
import { LoginButton } from "../Header/Header";
import UPennLogo from "../../assets/images/upenn.svg";
import "./IndexPageDetail.scss";

export interface IndexTopLeftProps {
  isAuthenticated: boolean;
  onLogin: (accessToken: string) => void;
}

const IndexTopLeft: React.FC<IndexTopLeftProps> = ({ isAuthenticated, onLogin }) => {
  const onSuccess = async (res: any) => onLogin(res.tokenId);
  return (
    <div className="topleft">
      <div className="topleft__row1">
        <img width="45px" src={UPennLogo} alt="Univeristy of Pennsylvania"></img>
      </div>
      <div className="topleft__row2">Community-powered mock interviews</div>
      <div className="topleft__row3">Prepare for technical interviews with other members of the MCIT program</div>
      <div className="topleft__row4">
        {isAuthenticated ? (
          <div></div>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}
            onSuccess={onSuccess}
            hostedDomain="seas.upenn.edu"
            render={(renderProps) => <LoginButton onClick={renderProps.onClick} disabled={renderProps.disabled} />}
          />
        )}
      </div>
    </div>
  );
};

export default IndexTopLeft;
