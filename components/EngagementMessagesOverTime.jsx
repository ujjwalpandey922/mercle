import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import engagementHelper from "./EngagementHelper";
import messageCountList from "@/Data/messageCountList";
import channels from "@/Data/channels";

const EngagementMessagesOverTime = () => {
  const options = engagementHelper.engagementMessageOverTimeChartOptions(
    messageCountList,
    channels
  );

  return (
    <HighchartsReact highcharts={Highcharts} options={options}  />
  );
};

export default EngagementMessagesOverTime;
