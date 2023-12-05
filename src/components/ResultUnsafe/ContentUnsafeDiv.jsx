import { landingPageStyles } from "../../styles/LandingPage";
import { Navbar } from "../shared/Navbar/Navbar";
import { AllNotificationsDiv } from "./AllNotficationsDiv";
import { InProgressDiv } from "./InProgressDiv";
import { RescanDiv } from "./RescanDiv";
import { StatusDiv } from "./StatusDiv";

export function ContentUnsafeDiv() {
  return (
    <section className="w-full  flex flex-col gap-y-[50px] ">
      <Navbar />
      {/* topdiv */}
      <div className="flex flex-col gap-y-[16px] ml-[121px] mt-[-35px]">
        <label
          className={`${landingPageStyles.HeadingDivCreds}`}
          aria-label="company_name"
        >
          Company Name
        </label>
        <input
          type="text"
          name="company_name"
          id="company_name"
          className={`w-[887px] h-[72px] border-[1px] border-[#02C3FF] rounded-[12px] px-[36px] ${landingPageStyles.HeadingDivInputText}`}
        ></input>
      </div>
      <StatusDiv />
      <InProgressDiv />
      <AllNotificationsDiv />
      <RescanDiv />
      <section className="h-[100px] bg-transparent w-full"></section>
    </section>
  );
}
