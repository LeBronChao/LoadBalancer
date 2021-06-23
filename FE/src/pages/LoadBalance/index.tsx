import { FC } from "react";
import ChartGroup from "../../components/ChartGroup";

const LoadBalance: FC = () => {
  return (
    <div>
      <ChartGroup title="LoadBalance Connect Distribution Chart " ctx="count" />
      <ChartGroup title="LoadBalance CostTime Chart " ctx="costTime" />
      {/*<ChartGroup*/}
      {/*  title="LoadBalance RealTime Connection Chart "*/}
      {/*  ctx="connection"*/}
      {/*/>*/}
    </div>
  );
};

export default LoadBalance;
