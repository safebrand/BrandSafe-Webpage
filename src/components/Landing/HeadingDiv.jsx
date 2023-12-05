import logoImg from "../../assets/mainLogo.svg";
import { landingPageStyles } from "../../styles/LandingPage";
export function HeadingDiv() {
  return (
    <section className="h-[35vh] w-screen ">
      <div className=" h-full w-auto flex flex-col justify-center items-center">
        <h3 className={`${landingPageStyles.HeadingDivLineOne}`}>
          Welcome to{" "}
        </h3>
        <img src={logoImg} alt="logo of brand"></img>
        <h1 className={`${landingPageStyles.HeadingDivLineThree}`}>
          Protecting brands from frauds across the globe
        </h1>
      </div>
    </section>
  );
}
