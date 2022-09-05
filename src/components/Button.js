import { StyledButton } from "../css/StyledComponent";

export const Button = ({ value, click }) => {
  return (
    <StyledButton className={value} onClick={click}>
      {value}
    </StyledButton>
  );
};
