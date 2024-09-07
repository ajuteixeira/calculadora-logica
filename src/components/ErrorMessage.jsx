export default function ErrorMessage({error = false}) {
  return (
  <div id="errorMessage" className={`text-center ${error ? 'block' : 'hidden'}`}>Expressão inválida</div>
)
}