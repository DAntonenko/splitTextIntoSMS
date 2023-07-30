function splitTextIntoSMS(text) {
  const maxSMSLength = 140;
  const SMSArr = [];

  // The simpliest case with just 1 SMS
  if (text.length <= maxSMSLength) {
    SMSArr.push(text);
  } else {

    function addSuffixes(arrOfSMS) {
      return arrOfSMS.map((SMS, index) => SMS += ` ${index + 1}/${arrOfSMS.length}`);
    }

    // The case when the total number of SMS is > 1 and < 10
    const wordsArr = text.split(' ');
    let currentSMS = '';
    let suffixLength = 4; // the suffix length for the case when the total number of SMS is > 1 and < 10

    wordsArr.forEach(word => {
      
      if ((currentSMS + ' ' + word).length + suffixLength <= maxSMSLength) {
        currentSMS += ' ' + word;
      } else {
        SMSArr.push(currentSMS.trim());
        currentSMS = word;
      }
    });
    
    SMSArr.push(currentSMS.trim());

    if (SMSArr.length < 10) {
      return addSuffixes(SMSArr);
    } else {

      // The case when the total number of SMS is of 10 or more
      function calcSuffixLength(serialNumberOfSMS, totalQantityOfSMS) {
        if (serialNumberOfSMS > totalQantityOfSMS) totalQantityOfSMS = serialNumberOfSMS;
        return (serialNumberOfSMS.toString() + totalQantityOfSMS.toString()).length + 2; // 2 is additional length from ' ' and '/'
      }

      let permutationsCompleted = false;
      let numberOfEmptyIterations = 0;

      while(!permutationsCompleted) {
        SMSArr.forEach((SMS, index, arr) => {
          suffixLength = calcSuffixLength(index + 1, SMSArr.length);
  
          if (SMS.length + suffixLength > maxSMSLength) {
            const splitedSMS = SMS.split(' ');
            const extraWord = splitedSMS.pop();
            const splitedNextSMS = arr[index + 1] ? arr[index + 1].split(' ') : [];
            splitedNextSMS.unshift(extraWord);
            arr.splice(index, 1, splitedSMS.join(' '));
            arr[index + 1] ? arr.splice(index + 1, 1, splitedNextSMS.join(' ')) : arr.push(splitedNextSMS.join(' '));
          } else {
            numberOfEmptyIterations++;
            if (numberOfEmptyIterations === SMSArr.length) permutationsCompleted = true;
          }
        });
      }

      return addSuffixes(SMSArr);
    }
  }

  // Return the simpliest case with just 1 SMS
  return SMSArr;
}
