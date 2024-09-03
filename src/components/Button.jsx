export default function Button(props) {
  return (
    <button
      className={`
    ${
      props.color === "default" &&
      "border border-[#c1afda] text-[#7e459b] bg-[#7927bd21] hover:bg-[#7927bd52]"
    }

    ${props.color === "dark" && "text-white bg-[#7e459b] hover:bg-[#713d8b]"}
    ${props.format === "default" && "w-[50px] h-[50px]"}
    ${props.format === "large" && "w-full h-[50px]"}
    `}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
