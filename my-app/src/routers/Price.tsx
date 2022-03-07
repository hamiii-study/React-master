import { useQuery } from "react-query";
import { fetchCoinHistroy } from "../api";
import styled from "styled-components";
import ApexChart from "react-apexcharts";
import React from "react";

const Container = styled.div`
  /* background-color: #92cbfc; */
  max-width: 480px;
  height: fit-content;
  margin: 0 auto;
  border-radius: 10px;
  opacity: 60%;

  border-style: solid;
  border-width: 2px;
  border-color: black;
`;

const Dates = styled.ul`
  width: 25%;
  height: auto;

  border-right: 2px solid black;
`;
const Date = styled.li`
  padding-left: 3%;
  border-bottom: 2px solid black;
  text-align: center;
  color: rgb(38, 222, 255);
`;

const PriceData = styled.div`
  width: 100%;
  height: 100%;
`;
interface PriceProps {
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

function Price({ coinId }: PriceProps) {
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
          type="line"
          series={[
            {
              name: "High",
              data: data?.map((date) => date.high.toFixed(3)),
            },
            {
              name: "Low",
              data: data?.map((date) => date.low.toFixed(3)),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
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

export default Price;
