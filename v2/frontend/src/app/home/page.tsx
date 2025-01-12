import { Header } from "@/home/components/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-20 w-full">
        <div className="relative w-full">
          <div className="relative">
            <img
              src="/images/Smart_deicafé.png"
              alt="Smart_deicafé"
              className="object-cover w-full"
            />
          </div>
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm w-20 md:text-lg text-white border rounded-lg bg-green-500 hover:opacity-90 transition-all duration-200">
            予約する
          </button>
        </div>
        <div className="px-5 mt-5 w-full h-auto bg-orange-50">
          <p className="mt-3 font-bold w-full text-2xl text-start">
            Reservation
          </p>
          <div className="w-full my-5 h-[100px] bg-white rounded-md"></div>
          <div className="w-full my-5 h-[100px] bg-white rounded-md"></div>
        </div>
        <div className="px-5 pt-5 h-auto w-full bg-gray-50 text-sm">
          <p className="font-bold w-full text-2xl text-start">Information</p>

          <div className="flex w-full py-5 border-b border-gray-300 max-h-40">
            <div className="w-1/3 min-w-[120px]">
              <img
                src="/images/Mango_Yogurt_smoothie.png"
                alt="Mango_Yogurt_smoothie"
                width={120}
                height={120}
                className="object-cover border rounded-md"
              />
            </div>
            <div className="w-2/3 pl-4">
              <div className="h-4/5 overflow-y-auto">
                <p className="break-words">
                  ・〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜
                </p>
              </div>
              <div className="h-1/5 text-blue-500">続きを見る</div>
            </div>
          </div>

          <div className="flex w-full py-5 border-b border-gray-300 max-h-40">
            <div className="w-1/3 min-w-[120px]">
              <img
                src="/images/Non_alcohol_Mojito.jpg"
                alt="Non_alcohol_Mojito"
                width={120}
                height={120}
                className="object-cover border rounded-md"
              />
            </div>
            <div className="w-2/3 pl-4">
              <div className="overflow-y-auto">
                <p className="break-words text-gray-600">
                  [新商品情報]
                  <br />
                  ノンアルコール モヒート
                </p>
              </div>
              <button className="mt-3 text-blue-500 hover:underline">
                続きを見る
              </button>
            </div>
          </div>

          <div className="flex w-full py-5 border-b border-gray-300 max-h-40">
            <div className="w-1/3 min-w-[120px]">
              <img
                src="/images/Very_Berry_smoothie.png"
                alt="Very_Berry_smoothie"
                width={120}
                height={120}
                className="object-cover border rounded-md"
              />
            </div>
            <div className="w-2/3 pl-4">
              <div className="h-4/5 overflow-y-auto">
                <p className="break-words">
                  ・〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜
                  ・〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜〜
                </p>
              </div>
              <div className="h-1/5 text-blue-500 underline">続きを見る</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
