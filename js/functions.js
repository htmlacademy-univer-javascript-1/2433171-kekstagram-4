// eslint-disable-next-line no-unused-vars
const checkStringLength = (string, maxLength) => string.length <= maxLength;

// eslint-disable-next-line no-unused-vars
const isPolindrome = (string) => {
  string =  string.replaceAll(' ', '');
  string = string.toLowerCase();
  // eslint-disable-next-line no-alert
  alert(string);
  for (let i = 0; i < (string.length - 1) / 2; i++) {
    if (string[i] !== string[string.length - 1 -i]) {return false;}
    return true;
  }
};

// eslint-disable-next-line no-unused-vars
const isMeetFitSchedule =
(startWorkTime, endWorkTime, startMeetTime, meetingsDuration) => {
  const startWorkTimeArray = startWorkTime.split(':');
  const startWorkTimeInMinutes = parseInt(startWorkTimeArray[0], 10) * 60 + parseInt(startWorkTimeArray[1], 10);

  const endWorkTimeArray = endWorkTime.split(':');
  const endWorkTimeInMinutes = parseInt(endWorkTimeArray[0], 10) * 60 + parseInt(endWorkTimeArray[1], 10);

  const  startMeetTimeArray =  startMeetTime.split(':');
  const  startMeetTimeInMinutes =  parseInt(startMeetTimeArray[0],10) * 60 +  parseInt(startMeetTimeArray[1], 10);

  if ((startMeetTimeInMinutes < startWorkTimeInMinutes) ||
      (startMeetTimeInMinutes > endWorkTimeInMinutes)){
    return false;
  }

  if ((startMeetTimeInMinutes + meetingsDuration) > endWorkTimeInMinutes) {
    return false;
  }

  return true;
};
