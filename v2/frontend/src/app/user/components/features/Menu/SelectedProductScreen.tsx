import { useState } from "react";
import { Separator } from "@/user/components/ui/Separator";
import { useScreen } from "@/user/hooks/useScreen";
import { SelectButton } from "../../ui/SelectButton";

export const SelectedProductScreen = () => {
  const [isSmall, setIsSmall] = useState(true);
  const [count, setCount] = useState(1);
  const { setActiveScreenCheckAuth } = useScreen();

  return (
    <div>
      <div className="flex items-center justify-center text-start">
        <ProductMenuButton
          image="Banana_smoothie.png"
          name="バナナスムージー"
          price={400}
        />
      </div>
      <Separator />
      <SelectButton
        isSelected={isSmall}
        setIsSelected={setIsSmall}
        size="S"
        btn1Text="Small"
        btn2Text="Large"
        disabled={false}
      />
      <Separator />
      <Counter count={count} setCount={setCount} />
      <Separator />
      <div className="flex justify-end">
        <button
          className="btn-green-wide"
          onClick={() => setActiveScreenCheckAuth("Reservation")}
        >
          カートに入れる
        </button>
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
  return (
    <div className="flex flex-col mx-auto w-2/3 h-2/3">
      <img
        src={`/images/${image}`}
        alt={image}
        className="object-cover rounded-md"
      />
      <p className="pt-2">{name}</p>
      <p>{`¥${price}`}</p>
    </div>
  );
};

const Counter = (props: {
  count: number;
  setCount: (count: number) => void;
}) => {
  const { count, setCount } = props;

  return (
    <div className="flex justify-between">
      <div>
        <p className="font-bold text-[16px]">数量</p>
        {count}
      </div>
      <div className="flex my-2 gap-4">
        <button
          className="flex items-center justify-center disabled:opacity-50 w-5 h-5 border border-blue-500 text-blue-500 rounded-full"
          onClick={() => setCount(count - 1)}
          disabled={count === 1}
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
        <button
          className="flex items-center justify-center disabled:opacity-50 w-5 h-5 border border-blue-500 text-blue-500 rounded-full"
          onClick={() => setCount(count + 1)}
          disabled={false}
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
};
