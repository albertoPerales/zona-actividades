import "./Button.css";

export default function Button({ children, onClick, type = "button" }) {
  return (
    <button className="btn" onClick={onClick} type={type}>
      {children}
    </button>
  );
}
