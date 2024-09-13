export default function ErrorMessage({error = false}) {
  return (
  <div id="errorMessage" className={`text-center ${error ? 'visible' : 'invisible'}`}>Expressão inválida</div>
)
}