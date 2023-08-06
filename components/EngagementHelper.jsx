const EngagementHelper = {
  engagementMessageOverTimeChartOptions: function (messageCountList, channels) {
    // ======= Filter channels with messages on more than one date==========
    const channelsWithMultipleDates = channels.filter((channel) => {
      const messageDates = messageCountList
        .filter((message) => message.channelId === channel.id)
        .map((message) => message.timeBucket);
      const uniqueDates = new Set(messageDates);
      return uniqueDates.size > 1;
    });
    //  ========= unique dates =============
    const allDates = new Set(
      messageCountList.map((message) => message.timeBucket)
    );
    const uniqueDatesArray = Array.from(allDates).sort();

    //  =========== series =========
    const series = channelsWithMultipleDates.map((channel) => {
      const messageCounts = uniqueDatesArray.map((date) => {
        const countEntry = messageCountList.find(
          (message) =>
            message.channelId === channel.id && message.timeBucket === date
        );
        return countEntry ? parseInt(countEntry.count) : 0;
      });

      return {
        name: channel.name,
        data: messageCounts,
        color: "#00cc99",
      };
    });

    // ============== tooltip =============
    const tooltip = {
      formatter: function () {
        const channelName = this.series.name;
        const date = this.x;
        const messageCount = this.y;
        return `${channelName}<br>Date: ${date}<br>Messages: ${messageCount}`;
      },
    };
    //---------xaxis--------------
    const xaxis = new Set(
      messageCountList.map((message) =>
        message.timeBucket.slice(0, message.timeBucket.indexOf("T"))
      )
    );

    // =========== options==============
    const options = {
      chart: {
        type: "line",
        backgroundColor: "rgb(29, 28, 48)",
        width: "1100",
        height: "500",
      },
      title: {
        text: "Engagement Over Time",
        style: {
          color: "#d0d0e1",
        },
      },
      xAxis: {
        categories: Array.from(xaxis),
        title: {
          text: "Date",
          style: {
            color: "#d0d0e1", // Set the color of the X-axis Title
          },
        },
        labels: {
          style: {
            color: "#d0d0e1", // Set the color of the X-axis labels
          },
        },
        lineColor: "#d0d0e1", // Set the color of the X-axis line
      },
      yAxis: {
        title: {
          text: "Message Count",
          style: {
            color: "#d0d0e1",
          },
        },
        labels: {
          style: {
            color: "#d0d0e1",
          },
        },
        lineColor: "d0d0e1",
        gridLineWidth: 0,
      },

      series: series,

      tooltip: tooltip,
    };

    return options;
  },
};

export default EngagementHelper;
