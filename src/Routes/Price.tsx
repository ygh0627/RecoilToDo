import { useRef } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

interface IPriceProps {
  coinId: string;
}
const Container = styled.div``;

function Price({ coinId }: IPriceProps) {
  const { data: priceData, isLoading } = useQuery([coinId, "PriceData"], () =>
    fetchCoinTickers(coinId)
  );
  return <h1>Price</h1>;
}

export default Price;
