import { threatsData } from "../../constants/UnsafePageData";
import { unsafePageStyles } from "../../styles/ResultsUnsafePage";

export function AllNotificationsDiv() {
  return (
    <section className="w-full">
      <div className="ml-[121px]">
        <h1 className={`${unsafePageStyles.inProgressHeadStyle}`}>
          All notifications
        </h1>
      </div>
      <div className="bg-[#FFEBEB] h-[545px] w-full flex pt-[36px] gap-[213px] mt-[40px]">
        {/* leftdiv */}
        <div className="flex flex-col gap-y-[40px] ml-[121px]">
          <h2 className={`${unsafePageStyles.statusHeadStyle}`}>Report</h2>
          <div>
            <h2 className={`${unsafePageStyles.scanCompleteStyle}`}>
              Scan Complete
            </h2>
            <h1 className={`${unsafePageStyles.threatsFoundStyle}`}>
              Threats Found
            </h1>
          </div>

          <div>
            <div className="h-[64px] w-[64px] bg-[#FF0000]  rounded-full flex justify-center items-center">
              <h1 className={`${unsafePageStyles.noOfThreatsStyle}`}>16</h1>
            </div>
            <h3 className={`${unsafePageStyles.statusHeadStyle}`}>
              Potential threats found
            </h3>
          </div>
          <div className="mt-[10px] w-[277px]">
            <button
              // onClick={navigateToDetails}
              className="px-[47px] py-[21px] bg-[#02C3FF] text-[#ffffff] text-[22px] font-[400] rounded-[10px]"
            >
              Take Action Now
            </button>
          </div>
        </div>
        {/* rightdiv */}
        <div className="flex flex-col gap-y-[38px]">
          <h1 className={`${unsafePageStyles.potentialThreatsHeadStyle}`}>
            Potential Threats
          </h1>
          <div className="grid grid-rows-8 grid-cols-2 gap-y-[16px] gap-x-[30px]">
            {threatsData.map((link) => (
              <h2
                className={`${unsafePageStyles.threatsListStyle}`}
                key={link.id}
              >
                {link.website}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
