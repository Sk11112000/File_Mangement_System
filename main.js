let inputArr=process.argv.slice(2);
let fs=require("fs");
let path=require("path");
const { getEnabledCategories } = require("trace_events");
let command=inputArr[0];
let types={
    image:["jpeg","png"],
    media:["mp4","mkv"],
    music:["mp3"],
    archives: ["zip","7z","rar","tar","gz","ar","iso","xz"],
    document: ["docx","doc","pdf","xlsx","xls","odt","odp","odg","odf","txt","ps","text"],
    app: ["exe","dmg","pkg","deb"]
}

switch (command){
    case "tree":{
        treeFn(inputArr[1]);
        break;}
    case "organize":{
        organizeFn(inputArr[1]);
        break;}
    case "help":{
        helpFn(inputArr[1]);
        break;}
}
function treeFn(dirPath)
{

}

function organizeFn(dirPath)
{ let destPath;
    if(dirPath==undefined)
     {
        console.log("Please insert the path");
        return;
    }
    else
    {
        let doesExit= fs.existsSync(dirPath);
        if(doesExit)
        {  destPath =path.join(dirPath,"organized_file");
        if(fs.existsSync(destPath)==false)    
       { fs.mkdirSync(destPath);}
       
        }
        else
        {
            console.log("Insert a vaild path");
        }

    }
    organizehelper(dirPath,destPath);
    
}

function helpFn(dirPath)
{
    console.log(`List of all Commands:
    node main.js tree "directoryPath"
    node main.js organize "directoryPath"
    node main.js help`);
    
}
function organizehelper(src,dest){
    let childName = fs.readdirSync(src);
    console.log(childName);
    for(let i=0;i<childName.length;i++)
    {
      
      let childaddress=path.join(src,childName[i]);
      let isfile=fs.lstatSync(childaddress).isFile();
      if(isfile)
      { 
        
        let category = getCategory(childName[i]);
        console.log(category);
        sendFile(childaddress,dest,category);
      }

    }
}
function sendFile(src,dest,category)
 {
 let categorypath=path.join(dest,category);
 if(fs.existsSync(categorypath)==false){
 fs.mkdirSync(categorypath);
 }
 let filename=path.basename(src);
 let destFilePath=path.join(categorypath,filename);
 fs.copyFileSync(src,destFilePath);
 fs.unlinkSync(src);
}
function getCategory(name)
{
    let ext=path.extname(name);
    ext=ext.slice(1);
    for(let type in types)
    {
        let curType=types[type];
        for(let i=0;i<curType.length;i++)
        {
            if(ext==curType[i]){
                return type;
            }
           
        }
    }
    return "other";
    
}

