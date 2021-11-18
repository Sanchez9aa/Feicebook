import "./home.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rigthbar from "../../components/rigthbar/Rigthbar";

const Home = () => (
  <>
    <Topbar />
    <div className="homeContainer">
      <Sidebar />
      <Feed />
      <Rigthbar />
    </div>
  </>
);

export default Home;
