export function getData(forMart) {
    var data = new Date();
    var year = data.getFullYear();
    var mouth = data.getMonth() + 1;
    var today = data.getDate();
    mouth = mouth < 10 ? (`0${mouth}`) : mouth;
    today = today < 10 ? (`0${today}`) : today;
    var hour = data.getHours() < 10 ? (`0${data.getHours()}`) : data.getHours();
    var minutes = data.getMinutes() < 10 ? (`0${data.getMinutes()}`) : data.getMinutes();
    
    return `${year}-${mouth}-${today} ${hour}:${minutes}`;
  }
  