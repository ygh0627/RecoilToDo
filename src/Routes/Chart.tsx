import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: IChartProps) {
  const { data: priceData, isLoading } = useQuery<IHistorical[]>(
    "ohlcv",
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          options={{
            theme: {
              mode: "dark",
            },
            stroke: {
              width: 3,
            },

            xaxis: {
              type: "datetime",
              axisTicks: {
                show: false,
              },
              categories: priceData?.map((item) => item.time_close),
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            chart: {
              width: 500,
              height: 700,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
          }}
          series={[
            {
              data: priceData?.map((item) => [
                Date.parse(item.time_close),
                item.open.toFixed(3),
                item.high.toFixed(3),
                item.low.toFixed(3),
                item.close.toFixed(3),
              ]),
            },
          ]}
        />
      )}
    </div>
  );
}

export default Chart;
