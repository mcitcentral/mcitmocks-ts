import IndexFeature from "./IndexFeature";
import VideoImage from "../../assets/images/video.svg";
import ScheduleImage from "../../assets/images/schedule.svg";
import AdjustImage from "../../assets/images/adjust.svg";
const IndexBottom: React.FC = () => {
  const titles =
    ["Set Preferences",
     "Mark Availability", 
     "Mock Interview"];
  const introductions =
    ["After loggin in, you can set up interview preferences like programming languages, difficullty of questions etc.",
     "Mark your availabilities on dashbord page,\
     send interview invitations to matched peers or \
     accept invitations from others.", 
     "Click the link on top of your dashbord to access the confirmed interview. \
     Interact with peers by code editor and two live video screens."];
  return (
    <div className="bottom">
      <div className="bottom__header">How does it work?</div>
      <div className="bottom__columns">
        <div className="bottom__columns__col1">
          <IndexFeature logo={AdjustImage} title={titles[0]} introduction={introductions[0]}></IndexFeature>
        </div>
        <div className="bottom__columns__col2">
          <IndexFeature logo={ScheduleImage} title={titles[1]} introduction={introductions[1]}></IndexFeature>
        </div>
        <div className="bottom__columns__col3">
          <IndexFeature logo={VideoImage} title={titles[2]} introduction={introductions[2]}></IndexFeature>
        </div>
      </div>
    </div>
  );
};

export default IndexBottom;
