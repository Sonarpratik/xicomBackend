// Transform into the desired structure
 const fileArrayTransform = (typeOfFile, fileName, files) => {
  const transformedFiles = fileName.map((name, index) => ({
    fileName: name,
    typeOfFile: typeOfFile[index],
    document: files[index],
  }));

  return transformedFiles;
};


module.exports = {
    fileArrayTransform,
  };
  
  
  