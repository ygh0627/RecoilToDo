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
  const { data, isLoading } = useQuery<IHistorical[]>(
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
          type="line"
          series={[{ name: "price", data: data?.map((price) => price.close) }]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              labels: {
                show: false,
              },
              categories: data?.map((date) => date.time_close),
            },
            yaxis: {
              show: false,
            },
            theme: {
              mode: "dark",
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
            tooltip: {
              y: {
                formatter: (value) => "$" + value.toFixed(3),
              },
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["blue"],
                stops: [0, 100],
              },
            },
            colors: ["red"],
          }}
        />
      )}
    </div>
  );
}

export default Chart;
