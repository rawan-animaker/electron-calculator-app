import styledComponent from "styled-components";

export const StyledCalculatorContainer = styledComponent.div`
  width: 100%;
  height:100vh;
  padding: 1.2rem;
  background-color: #525253;
`;
// border-radius: 4%;

export const StyledResult = styledComponent.div`
height: 20%;
width: 100%;
font-size:1.5rem;
padding: 0.5rem;
background-color: #c0d4c0d0;
border-radius: 10px;
display: flex;
align-items: flex-end;
justify-content: flex-end;
color: black;
font-weight: bold;
`;

export const StyledButtonContainer = styledComponent.div`
  display: flex;
  flex-wrap: wrap;
  height: 80%;
  padding: 1rem 0;
`;

export const StyledButton = styledComponent.button`
  flex: "1 0 21%";
  margin: 5px;
  border: none;
  background-color: ${(props) =>
    props.className === "=" ? "#fcb869" : "#e8e7e7"};
  font-size: 1.5rem;
  height: 3.5rem;
  width: 5rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10%;
  outline: none;
  &:hover {
    background-color: ${(props) =>
      props.className === "="
        ? "#fcb86990" : "#e8e7e790"};
  }
`;
