import { StyledResult } from "../css/StyledComponent";

export const Result = ({ value }) => {
  return <StyledResult>{value || "0"}</StyledResult>;
};
