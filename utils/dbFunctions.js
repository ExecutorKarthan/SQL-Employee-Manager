//Create a formatter to make logged results more readable.
function formatTable(values, maxWidth){
  //Create a variable to store printable data for each line
  var resultLine = []
  //Iterate through list of values, which is a 2-D array
  for(let index = 0; index < values.length; index++){
    let line = "";
    //For each value array, convert each attribute to a string then pad it with spaces
    values[index].forEach((attrib) => {
      let attribString = attrib.toString();
      while(attribString.length < maxWidth +1){
        attribString = attribString + " ";
      }
      //Add the processed attribute to the table line
      line = line + attribString;
    });
    //Save the finished line for later printing
    resultLine.push(line)
  }
  //Log each line, making the table
  resultLine.forEach((line) =>{
    console.log(line)
  })
}

//Export the module for use in index.js
module.exports ={formatTable}