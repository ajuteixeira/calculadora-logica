export default function Input({ value, error = false }) {
  return (
    <textarea
      rows="2"
      value={value}
      name=""
      id=""
      readOnly={true}
      placeholder="expressão lógica"
      className={`w-full p-3 outline-none overflow-hidden bg-[#7927bd21] ${
        error ? "border-2 border-rose-400" : ""
      }`}
    ></textarea>
  );
}
