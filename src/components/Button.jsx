export default function Button(props) {
  return (
    <button
      className={`
    ${
      props.color === "purple" &&
      "text-[#f5f5f5] bg-[#7e459b] hover:bg-[#713d8b]"
    } p-2
    `}
      type={props.type}
    >
      {props.children}
    </button>
  );
}
