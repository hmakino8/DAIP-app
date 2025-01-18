import { lato } from "@/user/config";
import { useAuth } from "@/user/hooks/useAuth";
import { AuthPromptBar } from "../../ui/AuthPromptBar";

export const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="w-full pt-8">
        {user && <ReservationStatus />}
        <HeroSection />
        <InfoSection />
        {!user && <AuthPromptBar />}
      </div>
    </>
  );
};

const ReservationStatus = () => {
  return (
    <div className="p-5 my-5 w-full bg-orange-50">
      <p className="font-bold w-full text-xl text-start">ご予約状況</p>
      <div className="w-full my-5 h-[50px] bg-white rounded-md"></div>
      <div className="w-full my-5 h-[50px] bg-white rounded-md"></div>
    </div>
  );
};

const HeroSection = () => {
  return (
    <div className="relative">
      <img
        src="/images/Smart_deicafe.png"
        alt="Smart_deicafe"
        className="object-cover w-full h-[250px]"
      />
      <div className="absolute flex flex-col items-center justify-center top-0 h-full w-full">
        <p className={`text-center text-2xl text-white/90 ${lato.className}`}>
          SMART dei café
        </p>
        <button className="w-36 h-12 mt-1 sm:mt-3 text-white text-md bg-green-600 border border-green-700 rounded-full hover:bg-green-500 transition-all duration-200 shadow-2xl">
          座席を予約する
        </button>
      </div>
    </div>
  );
};

const InfoSection = () => {
  return (
    <div className="p-5 h-auto w-full bg-gray-50 text-sm pb-28">
      <p className="font-bold w-full text-2xl text-start">What's New</p>

      <Contents
        image="Mango_Yogurt_smoothie.png"
        description="・〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜"
      />

      <Contents
        image="Non_alcohol_Mojito.jpg"
        description={`[新商品情報]
ノンアルコール モヒート`}
      />

      <Contents
        image="Very_Berry_smoothie.png"
        description="・〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜"
      />
    </div>
  );
};

const Contents = (props: { image: string; description: string }) => {
  const { image, description } = props;
  return (
    <div className="flex w-full py-5 border-b border-gray-300 max-h-40">
      <div className="w-1/3 min-w-[120px]">
        <img
          src={`/images/${image}`}
          alt={image}
          width={120}
          height={120}
          className="object-cover border rounded-md"
        />
      </div>
      <div className="w-2/3 pl-4">
        <div className="h-4/5 overflow-y-auto">
          <p className=" text-gray-600 break-words whitespace-pre-wrap">
            {description}
          </p>
        </div>
        <div className="h-1/5 text-blue-500">続きを見る</div>
      </div>
    </div>
  );
};
