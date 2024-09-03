export default function Input({ value }) {
  return (
    <input
      type="text"
      value={value}
      name=""
      id=""
      readOnly={true}
      placeholder="expressão lógica"
      className="w-full h-[50px] p-3 outline-none bg-[#7927bd21]"
    />
  );
}
