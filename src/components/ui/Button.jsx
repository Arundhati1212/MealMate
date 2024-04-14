export default function Button({ children, textOny, classes, ...props }) {
  let cssClasses = textOny ? "text-button" : "button";
  cssClasses += " " + classes;
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}
