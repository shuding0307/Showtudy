import styles from "./button.module.css";

interface ButtonProps {
  size?: "small" | "medium" | "large" | "large_main" | "very_small";
  property?: "default" | "confirm" | "pressed" | "disabled" | "cancel" | "black" | "disabledColor";
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({ size = "medium", property = "default", onClick, children }: ButtonProps) {
  const isDisabled = property === "disabled";

  return (
    <button
      className={`${styles[size]} ${styles[property]} ${!isDisabled ? styles.pointer : ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
