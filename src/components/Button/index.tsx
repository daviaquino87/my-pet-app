//label
//function onClick
//...classes

function Button({ label, onClick, className = "", ...rest }: any) {
  return (
    <button className={`my-pet-button ${className}`} {...rest}>
      {label}
    </button>
  );
}
export default Button;
