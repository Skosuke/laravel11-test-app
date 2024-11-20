import React from "react";
import { FC } from "react";

type CardProps = {
  title: string;
  children: React.ReactNode;
};

const Card: FC<CardProps> = ({ title, children }) => (
  <div className="card-wrapper">
    <div className="card-body">
      <h1 className="card-title">{title}</h1>
      {children}
    </div>
  </div>
);

export default Card;