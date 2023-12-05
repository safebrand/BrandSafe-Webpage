import logoImgWhite from "../../../assets/whiteLogo.svg";
import iconsImgs from "../../../assets/icons.svg";
import { resultSafeStyles } from "../../../styles/ResultSafePage";
export function SideBar() {
  return (
    <section className="w-[364px] h-screen bg-[#02C3FF] rounded-br-[12px] rounded-tr-[12px] pl-[101px] pr-[64px] pt-[73px]">
      <img src={logoImgWhite}></img>
      <a href="">
        <div className="flex gap-[24px] items-center mt-[100px]">
          <img src={iconsImgs}></img>
          <h2 className={`${resultSafeStyles.sideBarStyles}`}>Dashboard</h2>
        </div>
      </a>
      <a href="">
        <div className="flex gap-[24px] items-center mt-[62px]">
          <img src={iconsImgs}></img>
          <h2 className={`${resultSafeStyles.sideBarStyles}`}>Profile</h2>
        </div>
      </a>
    </section>
  );
}
