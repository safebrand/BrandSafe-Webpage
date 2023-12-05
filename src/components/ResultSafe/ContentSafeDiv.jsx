import { detailsEntryPageStyles } from "../../styles/DetailsEntryPage";
import { landingPageStyles } from "../../styles/LandingPage";
import tickImg from "../../assets/tick.svg";
import { resultSafeStyles } from "../../styles/ResultSafePage";
import { Navbar } from "../shared/Navbar/Navbar";
export function ContentSafeDiv() {
  return (
    <section className="w-full h-screen flex flex-col gap-y-[50px] ">
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
      {/* middle scuccess banner */}
      <div className="h-[350px] w-full   bg-[#E6FFE5] px-[121px] pt-[36px]">
        <div>
          <h2 className={`${resultSafeStyles.reportHeadStyles}`}>Report</h2>
        </div>
        <div className="flex gap-[30px] items-start mt-[40px]">
          <div className="pt-[20px]">
            <img src={tickImg}></img>
          </div>
          <div>
            <h1 className={`${resultSafeStyles.ScanCompleteStyles}`}>
              Scan Complete
            </h1>
            <h2 className={`${resultSafeStyles.NoThreatStyles}`}>
              No Threats Found
            </h2>
          </div>
        </div>
      </div>
      {/* bottom scanndiv */}
      <div className="flex flex-col gap-y-[36px]  ml-[121px]">
        <input
          type="text"
          name="scan_website"
          id="scan_website"
          className={`w-[887px] h-[72px] border-[1px] border-[#02C3FF] rounded-[12px] px-[36px] ${landingPageStyles.HeadingDivInputText}`}
        ></input>
        <div>
          <button
            //   onClick={navigateToDetails}
            className="px-[92px] py-[21px] w-auto bg-[#02C3FF] text-[#ffffff] text-[22px] font-[400] rounded-[12px]"
          >
            Scan Now
          </button>
        </div>
      </div>
    </section>
  );
}
