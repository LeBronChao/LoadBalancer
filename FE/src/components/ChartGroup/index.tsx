import { useState, useEffect, useRef } from "react";
import { Column, Pie } from "@ant-design/charts";
import { getData } from "../../service/LoadBalance";
import "./index.css";
interface chartGroupProps {
  title?: string;
  ctx?: string;
}

const ChartGroup = (props: chartGroupProps) => {
  const initCounterColumnConfig: any = {
    data: [],
    xField: "PORT",
    yField: "COUNT",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    meta: {
      type: { alias: "PORT" },
      sales: { alias: "COUNT" },
    },
  };

  const initCounterPieConfig: any = {
    appendPadding: 0,
    data: [],
    angleField: "COUNT",
    colorField: "PORT",
    radius: 0.8,
    label: {
      type: "spider",
      labelHeight: 28,
      content: "{name}\n{percentage}",
    },
    interactions: [{ type: "element-selected" }, { type: "element-active" }],
  };

  const [counterColumnConfig, setCounterColumnConfig] = useState(
    initCounterColumnConfig
  );
  const [counterPieConfig, setCounterPieConfig] = useState(
    initCounterPieConfig
  );

  const init = async () => {
    const res: any = await getData();
    const { urlCollect } = res.data;
    let copyCounterColumnConfig: any = counterColumnConfig;
    let copyCounterPieConfig: any = counterPieConfig;
    let data: any = [];
    for (let key in urlCollect) {
      data.push({
        PORT: key.split(":")[2],
        COUNT: urlCollect[key][`${props.ctx}`],
      });
    }
    copyCounterColumnConfig.data = data;
    copyCounterPieConfig.data = data;
    setCounterColumnConfig(copyCounterColumnConfig);
    setCounterPieConfig(copyCounterPieConfig);
    CounterColumn.current.getChart().update(copyCounterColumnConfig);
    CounterPie.current.getChart().update(counterPieConfig);
  };

  const CounterColumn: any = useRef();
  const CounterPie: any = useRef();

  useEffect(() => {
    const timer = setInterval(init, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="container">
      <div>
        <h1 className="counter-title">{props.title}</h1>
        <div className="row">
          <Column
            {...counterColumnConfig}
            ref={CounterColumn}
            animation={false}
            width={1200}
            height={400}
            autoFit={false}
            tooltip={{ title: "LoadBalance" }}
            renderer={"svg"}
          />
          <Pie
            className="counter-pie"
            {...counterPieConfig}
            ref={CounterPie}
            width={550}
            height={360}
            animation={false}
            renderer={"svg"}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartGroup;
