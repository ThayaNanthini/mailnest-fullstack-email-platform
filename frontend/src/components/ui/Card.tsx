import { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Card = ({ children, ...props }: CardProps) => {
  return (
    <div className="card" {...props}>
      {children}
    </div>
  );
};

export default Card;