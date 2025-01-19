import { useState, useEffect } from "react";
import { Separator } from "../../ui/Separator";
import { SelectButton } from "../../ui/SelectButton";
import { useScreen } from "@/user/hooks/useScreen";

export const ReservationScreen = () => {
  const [isTakein, setIsTakein] = useState(true);
  const [isPreOrder, setIsPreOrder] = useState(true);
  const { setActiveScreenCheckAuth } = useScreen();
  const reservationButtonText = `予約日時${isTakein ? " & 座席" : ""}を選択`;

  useEffect(() => {
    if (!isTakein && !isPreOrder) {
      setIsPreOrder(true);
    }
  }, [isTakein, isPreOrder]);

  return (
    <div>
      <SelectButton
        isSelected={isTakein}
        setIsSelected={setIsTakein}
        size="L"
        btn1Text="店内飲食"
        btn2Text="お持ち帰り"
        disabled={false}
      />
      <SelectButton
        isSelected={isPreOrder}
        setIsSelected={setIsPreOrder}
        size="L"
        btn1Text="事前注文あり"
        btn2Text="事前注文なし"
        disabled={!isTakein}
      />
      <Separator />
      <div className="w-full">
        <div className="flex items-center">
          <span className="material-symbols-outlined mr-3">calendar_month</span>
          <p className="font-bold text-[16px]">予約</p>
        </div>
        <button className="w-full mt-3 text-start text-blue-500 hover:text-blue-400">
          <p className="text-lg">{reservationButtonText}</p>
        </button>
        <Separator />

        {isPreOrder && (
          <>
            <div className="flex items-center">
              <span className="material-symbols-outlined mr-3">
                shopping_cart
              </span>
              <p className="font-bold text-[16px]">商品カート</p>
            </div>
            <button
              className="flex items-center justify-start w-full mt-3 text-start text-blue-500 hover:text-blue-400"
              onClick={() => setActiveScreenCheckAuth("Menu")}
            >
              <span className="material-symbols-outlined mr-3 p-2">
                add_circle
              </span>
              <p className="text-lg">商品を追加</p>
            </button>
          </>
        )}
      </div>

      <div className="flex justify-end">
        <button className="btn-green-wide">予約を確定する</button>
      </div>
    </div>
  );
};
