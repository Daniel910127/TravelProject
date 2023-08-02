const secToClock = {
  getHour: function (sec) {
    const hour = Math.floor(sec / 3600); // Divide seconds by 3600 to get the number of hours
    return hour;
  },

  getMin: function (sec) {
    const remainingSec = sec % 3600; // Calculate the remaining seconds after getting hours
    const min = Math.floor(remainingSec / 60); // Divide remaining seconds by 60 to get minutes
    return min;
  },
};

export default secToClock;
