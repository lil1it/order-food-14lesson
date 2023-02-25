import { useContext } from "react";
import styled from "styled-components";
import BackgroundImg from "../../assets/images/image.jpg";
import { BasketContext } from "../../store/BasketContext";
import Basket from "../basket/Basket";
import SummaryInfoCard from "./SummaryInfoCard";
const Summary = () => {
  const { isBasketVisible } = useContext(BasketContext);
  return (
    <Container>
      <StyledImg src={BackgroundImg} alt="Summary" />
      {isBasketVisible && <Basket />}
      <SummaryInfoCard />
    </Container>
  );
};

export default Summary;

const Container = styled.div`
  height: 527px;
`;

const StyledImg = styled.img`
  height: 432px;
  width: 100vw;
`;
