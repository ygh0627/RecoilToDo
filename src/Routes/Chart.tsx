import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface IChartProps {
  coinId: string;
}
function Chart({ coinId }: IChartProps) {
  const { data, isLoading } = useQuery("ohlcv", () => fetchCoinHistory(coinId));
  return <h1>Chart</h1>;
}

export default Chart;
