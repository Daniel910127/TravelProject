const secToClock = {
  getHour: function (sec) {
    const hour = Math.floor(sec / 3600); // Divide seconds by 3600 to get the number of hours
    return hour
  },

  getMin: function (sec) {
    const min = Math.floor((sec % 3600) / 60); // Calculate the remaining seconds after getting hours, divide by 60 to get minutes
    return min
  },
};

export default secToClock