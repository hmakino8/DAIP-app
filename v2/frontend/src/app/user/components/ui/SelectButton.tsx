export const SelectButton = (props: {
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
  size: "S" | "L";
  btn1Text: string;
  btn2Text: string;
  disabled?: boolean;
}) => {
  const { isSelected, setIsSelected, size, btn1Text, btn2Text, disabled } =
    props;
  const width = size === "S" ? "w-24" : "w-32";

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center my-2">
        <button
          className={`${style(isSelected, width)} rounded-l-full`}
          onClick={() => setIsSelected(true)}
          disabled={disabled}
        >
          {btn1Text}
        </button>
        <button
          className={`${style(!isSelected, width)} rounded-r-full border-l-0`}
          onClick={() => setIsSelected(false)}
          disabled={disabled}
        >
          {btn2Text}
        </button>
      </div>
    </div>
  );
};

const style = (isSelected: boolean, width: string): string => {
  const commonStyle = "px-2 h-8";

  return isSelected
    ? `${commonStyle} bg-gray-500 text-white ${width} disabled:opacity-50`
    : `${commonStyle} border-gray-500 text-gray-500 border border-gray-500 ${width} disabled:opacity-50`;
};
