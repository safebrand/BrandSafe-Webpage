import { landingPageStyles } from "../../styles/LandingPage";

export function RescanDiv() {
  return (
    <div>
      <div className="flex items-center gap-[20px]">
        <input
          type="text"
          name="company_name"
          id="company_name"
          className={`w-[590px] h-[72px] border-[1px] border-[#02C3FF] rounded-[12px] px-[36px] ${landingPageStyles.HeadingDivInputText}`}
        ></input>
        <div className="h-[72px] w-[277px] flex">
          <button
            // onClick={navigateToDetails}
            className="px-[64px] py-[21px] bg-[#151515] text-[#ffffff] text-[22px] font-[400] rounded-[10px] w-full"
          >
            Re-Scan Now
          </button>
        </div>
      </div>
    </div>
  );
}
