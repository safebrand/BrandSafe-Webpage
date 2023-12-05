import logoImg from "../../assets/mainLogo.svg";
import { landingPageStyles } from "../../styles/LandingPage";
import { Routes, Route, useNavigate } from "react-router-dom";
import DetailsEntry from "../../v1/DetailsEntry/App";
export function LoginDiv() {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    // 👇️ navigate to /contacts
    navigate("/DetailsEntry");
  };
  return (
    <section className="h-[65vh] w-screen ">
      <div className="px-[20vw] flex flex-col gap-y-[50px]">
        <div>
          <h1 className={`${landingPageStyles.HeadingDivLogin}`}>Login</h1>
        </div>
        <div className="flex gap-[50px]">
          <div className="flex flex-col gap-y-[24px]">
            <label
              className={`${landingPageStyles.HeadingDivCreds}`}
              aria-label="username"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className={`w-[364px] h-[72px] border-[1px] border-[#02C3FF] rounded-[12px] px-[36px] ${landingPageStyles.HeadingDivInputText}`}
            ></input>
          </div>
          <div className="flex flex-col gap-y-[24px]">
            <label
              className={`${landingPageStyles.HeadingDivCreds}`}
              aria-label="password"
            >
              Password
            </label>
            <input
              type="text"
              name="password"
              id="password"
              className={`w-[364px] h-[72px] border-[1px] border-[#02C3FF] rounded-[12px] px-[36px] ${landingPageStyles.HeadingDivInputText}`}
            ></input>
          </div>
        </div>
        <div className="mt-[-10px]">
          <button
            onClick={navigateToDetails}
            className="px-[92px] py-[21px] bg-[#02C3FF] text-[#ffffff] text-[22px] font-[400] rounded-[12px]"
          >
            Proceed
          </button>
        </div>
      </div>
    </section>
  );
}
