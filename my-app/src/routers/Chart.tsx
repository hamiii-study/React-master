import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistroy } from "../api";
import ApexChart from "react-apexcharts";
import React from "react";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface ChartProps {
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

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom); //atom의 값을 가져옴

  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlvc", coinId],
    () => fetchCoinHistroy(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => [
                price.time_open,
                price.open.toFixed(3),
                price.high.toFixed(3),
                price.low.toFixed(3),
                price.close.toFixed(3),
              ]),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },

            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
