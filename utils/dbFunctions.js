function formatTable(values, maxWidth){
  var resultLine = []
  for(let index = 0; index < values.length; index++){
    let line = "";
    values[index].forEach((attrib) => {
      let attribString = attrib.toString();
      while(attribString.length < maxWidth +1){
        attribString = attribString + " ";
      }
      line = line + attribString;
    });
    resultLine.push(line)
  }
  resultLine.forEach((line) =>{
    console.log(line)
  })
}

module.exports ={formatTable}