const toStrClock = (hour, min) => {
  return `${hour < 10 ? `0${hour}` : hour} : ${min < 10 ? `0${min}` : min}`;
};

export default toStrClock;
