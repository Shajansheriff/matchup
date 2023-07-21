import Xarrow from "react-xarrows";
import { colors } from "@/lib/constants";

export const Arrows = ({ data }: { data: Map<string, string> }) => {
  return Array.from(data.entries(), ([start, end], index) => {
    let color = colors[index];
    return (
      <Xarrow key={start} start={start} end={end} curveness={1} color={color} />
    );
  });
};
