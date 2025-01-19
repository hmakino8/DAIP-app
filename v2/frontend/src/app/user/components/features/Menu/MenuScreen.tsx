import { useScreen } from "@/user/hooks/useScreen";
import { Separator } from "../../ui/Separator";

export const MenuScreen = () => {
  return (
    <div className="flex flex-col">
      <div>
        <p className="pb-2">スムージー</p>
        <div className="flex flex-wrap gap-3 text-start items-start">
          <ProductMenuButton
            image="Banana_smoothie.png"
            name="バナナスムージー"
            price={400}
          />
          <ProductMenuButton
            image="Green_smoothie.png"
            name="グリーンスムージー"
            price={500}
          />
          <ProductMenuButton
            image="Mango_Yogurt_smoothie.png"
            name="マンゴースムージー"
            price={500}
          />
        </div>
      </div>
      <Separator />

      <div>
        <p className="pb-2">コーヒー</p>
        <div className="flex flex-wrap gap-3 text-start items-start">
          <ProductMenuButton
            image="Cafe_Latte.jpg"
            name="カフェラテ"
            price={400}
          />
          <ProductMenuButton
            image="Caramel_Latte.jpg"
            name="キャラメルラテ"
            price={450}
          />
        </div>
      </div>
      <Separator />

      <div>
        <p className="p-2">ティー</p>
        <div className="flex flex-wrap gap-3 text-start items-start">
          <ProductMenuButton
            image="Earl_Gray.jpg"
            name="アールグレイ"
            price={350}
          />
          <ProductMenuButton
            image="Chamomile.jpg"
            name="カモミール"
            price={350}
          />
        </div>
      </div>
    </div>
  );
};

const ProductMenuButton = ({
  image,
  name,
  price,
}: {
  image: string;
  name: string;
  price: number;
}) => {
  const { setActiveScreenCheckAuth } = useScreen();

  return (
    <button
      className="flex flex-col w-28 sm:w-36 h-auto text-sm"
      onClick={() => setActiveScreenCheckAuth("SelectedProductScreen")}
    >
      <img
        src={`/images/${image}`}
        alt={image}
        className="w-full h-full object-cover rounded-md"
      />
      <div className="text-start text-[12px] sm:text-sm">
        <p className="pt-2">{name}</p>
        <p>{`¥${price}`}</p>
      </div>
    </button>
  );
};
