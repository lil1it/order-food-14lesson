import styled from "styled-components";
import "./App.css";
import Header from "./components/header/Header";
import Meals from "./components/meals/Meals";
import Summary from "./components/summary/Summary";
import { BasketProvider } from "./store/BasketContext";
function App() {
  return (
    <div className="App">
      <BasketProvider>
        <Header />
        <Content>
          <Summary />
          <Meals />
        </Content>
      </BasketProvider>
    </div>
  );
}

export default App;

const Content = styled.div`
  margin-top: 101px;
`;

// GET foods

// GET /basket
// HEADERS: {UserId: "Yryskeldi"}
//POST /food/:foodId/addToBasket
//BODY {amount: number}
//DELETE /basketitem/:id/delete
//PUT  /basketitem/:id/update
//BODY: {amount: number};
