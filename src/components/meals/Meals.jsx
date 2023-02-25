import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { fetchApi } from "../../link/fetchApi";
import MealItem from "./meal-item/MealItem";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);
  const getMeals = async () => {
    try {
      const response = await fetchApi("foods");
      setMeals(response.data);

      setLoading(false);
    } catch (error) {
      setError("Failed to load meals");
    }
  };
  useEffect(() => {
    getMeals();
  }, []);
  return (
    <Card>
      {isLoading && !error && <Loading></Loading>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {meals.map((meal) => {
        return (
          <MealItem
            key={meal._id}
            title={meal.title}
            description={meal.description}
            price={meal.price}
            id={meal._id}
            amount={meal.amount}
          />
        );
      })}
    </Card>
  );
};

export default memo(Meals);

const Card = styled.ul`
  background-color: #ffffff;
  border-radius: 16px;
  width: 64rem;
  margin: 40px auto;
  padding: 40px 40px 36px 40px;
`;

const Loading = styled.span`
  position: fixed;
  width: 130px;
  top: 50%;
  left: 50%;
  height: 100px;
  background-repeat: no-repeat;
  background-image: linear-gradient(#0277bd, #0277bd),
    linear-gradient(#29b6f6, #4fc3f7), linear-gradient(#29b6f6, #4fc3f7);
  background-size: 80px 70px, 30px 50px, 30px 30px;
  background-position: 0 0, 80px 20px, 100px 40px;

  :after {
    content: "";
    position: absolute;
    bottom: 10px;
    left: 12px;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    box-sizing: content-box;
    border: 10px solid #000;
    box-shadow: 78px 0 0 -10px #fff, 78px 0 #000;
    animation: wheelSk 0.75s ease-in infinite alternate;
  }

  :before {
    content: "";
    position: absolute;
    right: 100%;
    top: 0px;
    height: 70px;
    width: 70px;
    background-image: linear-gradient(#fff 45px, transparent 0),
      linear-gradient(#fff 45px, transparent 0),
      linear-gradient(#fff 45px, transparent 0);
    background-repeat: no-repeat;
    background-size: 30px 4px;
    background-position: 0px 11px, 8px 35px, 0px 60px;
    animation: lineDropping 0.75s linear infinite;
  }

  @keyframes wheelSk {
    0%,
    50%,
    100% {
      transform: translatey(0);
    }
    30%,
    90% {
      transform: translatey(-3px);
    }
  }

  @keyframes lineDropping {
    0% {
      background-position: 100px 11px, 115px 35px, 105px 60px;
      opacity: 1;
    }
    50% {
      background-position: 0px 11px, 20px 35px, 5px 60px;
    }
    60% {
      background-position: -30px 11px, 0px 35px, -10px 60px;
    }
    75%,
    100% {
      background-position: -30px 11px, -30px 35px, -30px 60px;
      opacity: 0;
    }
  }
`;
