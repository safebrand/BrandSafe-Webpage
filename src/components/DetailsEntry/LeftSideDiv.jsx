import logoImg from "../../assets/mainLogo.svg";
import { landingPageStyles } from "../../styles/LandingPage";
export function LeftSideDiv() {
  return (
    <div className=" h-screen w-[30vw] flex flex-col justify-center items-center ml-[5vw] ">
      <h3 className={`${landingPageStyles.HeadingDivLineOne}`}>Welcome to </h3>
      <img src={logoImg} alt="logo of brand"></img>
      <div className="w-[12vw] mt-[64px] ml-[-9vw]">
        <h1 className={`${landingPageStyles.HeadingDivLineThree}`}>
          Protecting brands from frauds across the globe
        </h1>
      </div>
    </div>
  );
}
