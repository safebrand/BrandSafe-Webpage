import { detailsEntryPageStyles } from "../../styles/DetailsEntryPage";
import { landingPageStyles } from "../../styles/LandingPage";
import { Routes, Route, useNavigate } from "react-router-dom";
export function RightSideDiv() {
  const navigate = useNavigate();
  const navigateToDetails = () => {
    // 👇️ navigate to /contacts
    navigate("/DetailsEntry/resultsafe");
  };
  return (
    <section className=" px-[100px] h-[100vh] w-auto flex flex-col justify-center gap-y-[35px]">
      {/* Topdiv */}
      <div className="flex flex-col gap-y-[36px]">
        <h1 className={`${detailsEntryPageStyles.rightSideDetailsHead}`}>
          Enter your company's details
        </h1>
        <div className="flex flex-col gap-y-[16px]">
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
      </div>

      {/* middleDiv */}
      <div className="flex flex-col gap-y-[36px]">
        <label
          className={`${landingPageStyles.HeadingDivCreds}`}
          aria-label="contact_number"
        >
          Company Website URL
        </label>
        <textarea className="h-[125px] w-[887px] border-[1px] border-[#02C3FF] rounded-[12px] px-[15px]"></textarea>
      </div>

      {/* bottomdiv */}
      <div className="flex gap-[40px]">
        <div className="flex flex-col gap-y-[16px]">
          <label
            className={`${landingPageStyles.HeadingDivCreds}`}
            aria-label="contact_number"
          >
            Contact Number
          </label>
          <div className="flex gap-[24px]">
            <input
              type="text"
              name="contact_number"
              placeholder={"+91"}
              id="contact_number"
              className={`w-[97px] h-[72px] border-[1px] border-[#02C3FF] rounded-[12px] px-[15px] ${landingPageStyles.HeadingDivInputText}`}
            ></input>
            <input
              type="text"
              name="contact_number"
              id="contact_number"
              placeholder="99026 22855"
              className={`w-[364px] h-[72px] border-[1px] border-[#02C3FF] rounded-[12px] px-[36px] ${landingPageStyles.HeadingDivInputText}`}
            ></input>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-y-[36px]">
            <div className="flex flex-col gap-y-[16px]">
              <label
                className={`${landingPageStyles.HeadingDivCreds}`}
                aria-label="contact_email"
              >
                Contact Email
              </label>
              <input
                type="text"
                name="contact_email"
                id="contact_email"
                placeholder="support@assertify.me"
                className={`w-[364px] h-[72px] border-[1px] border-[#02C3FF] rounded-[12px] px-[36px] ${landingPageStyles.HeadingDivInputText}`}
              ></input>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[50px]">
        <button
          onClick={navigateToDetails}
          className="px-[92px] py-[21px] bg-[#02C3FF] text-[#ffffff] text-[22px] font-[400] rounded-[12px]"
        >
          Proceed
        </button>
      </div>
    </section>
  );
}
