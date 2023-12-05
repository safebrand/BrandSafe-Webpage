import notifImg from "../../../assets/notif.svg";
import userImg from "../../../assets/user.svg";
export function Navbar() {
  return (
    <section className="w-full h-[88px]  flex items-center justify-end pr-[242px] mt-0">
      <div className="flex items-center gap-[40px]">
        <button>
          <img src={notifImg}></img>
        </button>
        <button>
          <img src={userImg}></img>
        </button>
      </div>
    </section>
  );
}
