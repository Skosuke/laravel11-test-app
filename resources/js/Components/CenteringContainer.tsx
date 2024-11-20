import React from "react";
import { FC } from "react";

type CenteringContainerProps = {
  children: React.ReactNode;
}

const CenteringContainer: FC<CenteringContainerProps> = ({ children }) => (
  <div className="centered-container">
    {children}
  </div>
);

export default CenteringContainer;