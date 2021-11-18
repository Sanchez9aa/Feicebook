import "./homeRigthbar.css";

const HomeRigthbar = () => {
  const { REACT_APP_PUBLIC_FOLDER } = process.env;

  return (
    <>
      <div className="birthdayContainer">
        <img
          className="birthdayImg"
          src={`${REACT_APP_PUBLIC_FOLDER}/birthday.png`}
          alt=""
        />
        <span className="birthdayText">
          <b>Juan y 3 amigos más cumplen años hoy</b>
        </span>
      </div>
      <img
        className="rightbarAd"
        src={`${REACT_APP_PUBLIC_FOLDER}/ad.jpg`}
        alt=""
      />
    </>
  );
};

export default HomeRigthbar;
