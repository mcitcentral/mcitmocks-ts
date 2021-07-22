import IndexBottom from "./IndexBottom";
import IndexTopLeft from "./IndexTopLeft";
import IndexTopRight from "./IndexTopRight";
import "./IndexPageDetail.scss";

interface IndexPageProps {
  isAuthenticated: boolean;
  onLogin: (accessToken: string) => void;
}

const IndexPageDetail: React.FC<IndexPageProps> = ({ isAuthenticated, onLogin }) => {
  return (
    <div>
      <div className="top">
        <IndexTopLeft isAuthenticated={isAuthenticated} onLogin={onLogin}></IndexTopLeft>
        <IndexTopRight></IndexTopRight>
      </div>
      <div className="bottom">
        <IndexBottom></IndexBottom>
      </div>
    </div>
  );
};

export default IndexPageDetail;
