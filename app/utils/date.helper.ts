function convertToDate(dateObj): Date {
  if (typeof dateObj === 'date') {
    return dateObj
  } else if (typeof dateObj === 'string') {
    dateObj = new Date(dateObj)
  } else if (typeof dateObj === 'number') {
    dateObj = new Date(dateObj)
  } else {
    throw('cannot convert ' + (typeof dateObj) + ' to a date')
  }

  return dateObj;
}

export const dateHelpers = {
  renderMonthDay: function(dateObj): string {
    dateObj = convertToDate(dateObj);

    console.log(typeof dateObj);
  
    let returnString = ""
    returnString += dateObj.getMonth() + 1
    returnString += "/"
    returnString += dateObj.getDate()
  
    return dateObj.toLocaleDateString('en-US', {month: 'long', day: 'numeric'});
  },
  renderDateforURL: function(dateObj): string {
    dateObj = convertToDate(dateObj);
  
    let returnString = ""
    returnString += dateObj.getFullYear()
    returnString += '-'
    returnString += (dateObj.getMonth() + 1).toString().padStart(2, '0')
    returnString += "-"
    returnString += dateObj.getDate()
  
    return returnString;
  }
}