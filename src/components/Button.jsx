export default function Button({ onClick, color, format, text }) {
  return (
    <button
      onClick={() => onClick(text)}
      className={`
    ${
      color === "default" &&
      "border border-[#c1afda] text-[#7e459b] bg-[#7927bd21] hover:bg-[#7927bd52]"
    }
    ${
      color === "red" &&
      "border border-[#daafc7] text-[#bd2760] bg-[#bd276021] hover:bg-[#daafc7]"
    }
    ${color === "dark" && "text-white bg-[#7e459b] hover:bg-[#713d8b]"}
    ${format === "default" && "w-[50px] h-[50px]"}
    ${format === "medium" && "w-[112px] h-[50px]"}
    ${format === "large" && "w-full h-[50px]"}
    `}
    >
      {text}
    </button>
  );
}
