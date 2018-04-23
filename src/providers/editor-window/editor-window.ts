import { Direct } from 'protractor/built/driverProviders';
import { dirname } from 'path';
import { Injectable,  NgZone } from '@angular/core';
import { MonacoServiceProvider } from '../../providers/monaco-service/monaco-service';
import { DirectoryEntry, File, FileEntry } from '@ionic-native/file';
import { Platform } from 'ionic-angular';

@Injectable()
export class EditorWindowProvider {
  counter: any = 0;
  dirPath: any;
  filentry: DirectoryEntry;
  dataResult: any;



  constructor(public monaco: MonacoServiceProvider,public file:File, public platform:Platform) {
      this.monaco.loadMonaco();

  }



  //initialize tab
  tabInit(tabID: string, fileExtension: string) {
      document.documentElement.style.overflow = 'hidden'; // firefox, chrome
      this.counter += 1;
      let parentContainer: any = document.getElementById('parent-node');
      let parentBodyContainer: any = document.getElementById('parent-body');
      let listItems: any = document.getElementById("parent-node").querySelectorAll("div");
      let currentBody: any = document.getElementById("parent-body").querySelectorAll("div");
      let sibling: any = document.getElementById("parent-node").nextElementSibling;
      let newTab: any = document.createElement("div");
      let newTabBody: any = document.createElement("div");
      let closeButton: any = document.createElement("button");
      let closeIcon: any = document.createTextNode("x");
      closeButton.appendChild(closeIcon);
      closeButton.setAttribute("class", "close");
      closeButton.setAttribute("id", "close-tab");
      newTab.appendChild(closeButton);
      let newTabTitle: any = document.createTextNode(this.counter + tabID); //remove the counter when ready for production
      let newTabBodyTitle: any = document.createTextNode(this.counter + tabID); //remove the counter when ready for production
      newTab.appendChild(newTabTitle);
      // newTabBody.appendChild(newTabBodyTitle);
      newTab.setAttribute("class", "tab");
      newTabBody.classList.add("hide");
      newTabBody.style.width = "100%";
      newTabBody.style.height = "100vh";
      newTabBody.style.positon = "fixed";
      newTab.setAttribute("id", this.counter + tabID); //remove the counter when ready for production
      newTabBody.setAttribute("id", this.counter + tabID); //remove the counter when ready for production
      //add click event to new tab
      newTab.addEventListener('click', (event) => this.activateTab(event));
      closeButton.addEventListener('click', (event) => this.closeTab(event));
      parentContainer.append(newTab);
      parentBodyContainer.append(newTabBody);
      if (newTab.classList.contains('active')) {
          return;
      }

      if (!newTab.classList.contains('active')) {
          for (var i = 0; i < listItems.length; i++) {
              listItems[i].classList.remove('active');
          }

          for (var l = 0; l < currentBody.length; l++) {
              currentBody[l].classList.add('hide');
          }
          newTab.classList.toggle('active');
          newTabBody.classList.remove('hide');

          for (var p = 0; p < currentBody.length; p++) {
              if (currentBody[p].id === newTab.id) {
                  currentBody[p].classList.remove('hide');
              }
          }

          //get data from settings.json file
          this.platform.ready().then(() => {
            this.file.readAsText(this.file.dataDirectory+"Settings", "user_selected_settings.json")
              .then((data) =>{
                this.dataResult = JSON.parse(data);
                    // this.readFromFile("settings.json","dataDirectory","Settings");
                    this.monaco.initMonaco(newTabBody.id, fileExtension, this.dataResult);
                    //scroll to new tab one container overflows
                    newTab.scrollIntoView({
                      behavior: "instant",
                      block: "end",
                      inline: "end"
                    });

                    }).catch(error =>{
                      console.log(error);
                  });
            });




      }

  }

  //set tabs to active
  activateTab(event) {
      let targetTabID: string = event.currentTarget.id;
      let targetTab: any = event.currentTarget;
      var listItems = document.getElementById("parent-node").querySelectorAll("div");
      var currentBody = document.getElementById("parent-body").querySelectorAll("div");

      //remove all active classes
      for (var i = 0; i < listItems.length; i++) {
          listItems[i].classList.remove('active');
      }
      //set current tab active;
      targetTab.classList.add('active');
      this.monaco.tabActivated(targetTab.id);

      //make sure all body content is hidden
      for (var l = 0; l < currentBody.length; l++) {
          currentBody[l].classList.add('hide');
      }

      //set matching body to active
      for (var j = 0; j < currentBody.length; j++) {
          if (currentBody[j].id === targetTab.id) {
              currentBody[j].classList.remove('hide');
              //get the tab body that is now active and loop through its children divs and remove hide class
              let sibilingsElm: any = currentBody[j].querySelectorAll('.hide');
              for (var k = 0; k < sibilingsElm.length; k++) {
                  sibilingsElm[k].classList.remove('hide');

              }

          }
      }

  }

  //close tab
  closeTab(event) {
      event.preventDefault();
      event.stopPropagation();

      let targetTab: any = event.currentTarget.parentNode;
      let targetTabParentList: any = event.currentTarget.parentNode.parentNode;
      let targetBodyList: any = document.getElementById("parent-body").querySelectorAll("div");
      let targetBody: any = document.getElementById("parent-body");

      //if tab is active
      if (targetTab.classList.contains('active')) {
          //if previous element sibiling is present
          if (targetTab.closest('div .tab').previousElementSibling != null) {
              targetTab.closest('div .tab').previousElementSibling.classList.add('active')
              for (let j: number = 0; j < targetBodyList.length; j++) {
                  if (targetBodyList[j].id == targetTab.closest('div .tab').previousElementSibling.id) {
                      targetBodyList[j].classList.remove('hide');
                      let sibilingsElm: any = targetBodyList[j].querySelectorAll('.hide');
                      for (var k = 0; k < sibilingsElm.length; k++) {
                          sibilingsElm[k].classList.remove('hide');
                      }
                  }
              }
              targetTabParentList.removeChild(targetTab);
              for (let i: number = 0; i < targetBodyList.length; i++) {
                  if (targetBodyList[i].id == targetTab.id) {
                      targetBody.removeChild(targetBodyList[i]);
                  }
              }
              return;
          }
          //if next element sibiling is present
          if (targetTab.closest('div .tab').nextElementSibling != null) {
              targetTab.closest('div .tab').nextElementSibling.classList.add('active')
              for (let n: number = 0; n < targetBodyList.length; n++) {
                  if (targetBodyList[n].id == targetTab.closest('div .tab').nextElementSibling.id) {
                      targetBodyList[n].classList.remove('hide');
                      let sibilingsElm: any = targetBodyList[n].querySelectorAll('.hide');
                      for (var t = 0; t < sibilingsElm.length; t++) {
                          sibilingsElm[t].classList.remove('hide');
                      }
                  }
              }
              targetTabParentList.removeChild(targetTab);
              for (let z: number = 0; z < targetBodyList.length; z++) {
                  if (targetBodyList[z].id == targetTab.id) {
                      targetBody.removeChild(targetBodyList[z]);
                  }
              }
              return;
          }
          //if  only one tab is open
          if (targetTab.closest('div .tab').nextElementSibling == null && targetTab.closest('div .tab').previousElementSibling == null) {
              targetTabParentList.removeChild(targetTab);
              for (let b: number = 0; b < targetBodyList.length; b++) {
                  if (targetBodyList[b].id == targetTab.id) {
                      targetBody.removeChild(targetBodyList[b]);
                  }
              }
              return;
          }
      } else {
          //tab is not active
          //just delete target tab
          targetTabParentList.removeChild(targetTab);
          for (let b: number = 0; b < targetBodyList.length; b++) {
              if (targetBodyList[b].id == targetTab.id) {
                  targetBody.removeChild(targetBodyList[b]);
              }
          }
          return;
      }

  }

  //create folder service
  createFolder(dirLocation:any, dirName:string){
    console.log('about to create direcoty');
        this.platform.ready().then(() => {
            this.file.createDir(dirLocation, dirName, true)
            .then(() => {
              console.log(dirName+' successfully created!');
              alert(dirName+' successfully created!');
            })
            .catch((err) => {
              console.error(err);
              alert("error creating directory")

            });
      });
  }

  //create write file service
  writeNewFile(dirLocation:any, dirName:string, fileName:string, fileData:any){
    this.platform.ready().then(() => {
      //create directory to hold new file
      let result = this.file.createDir(dirLocation, dirName, true)
      //get dir location and then wirte to file
      result.then(data => {
          this.dirPath = data.toURL(); //set dirPath = to data url
          console.log(this.dirPath);
          //check which type of file we should write
          this.file.writeFile(this.dirPath, fileName, fileData, {replace: true});
          //check that file was created
          this.checkFile(this.dirPath, fileName);


      }).catch(error =>{

        alert("error: " + error);
      })

    });



  }

  //method to check if file exist
  checkFile(fileDirectory:any, fileName:string){
    this.platform.ready().then(() => {
      this.file.checkFile(fileDirectory, fileName).then(_ => alert(fileName + ' exists')).catch(err => alert(fileName + ' does not exist'));
    });
  }

  //read data from file
  readFromFile(fileName:string, directoryType:string, directoryName:string){
    if(directoryType == "dataDirectory"){
      this.platform.ready().then(() => {
           this.file.readAsText(this.file.dataDirectory+directoryName, fileName)
             .then((data) =>{
               this.dataResult = data;

             }).catch(error =>{
                console.log(error);
             });
      });

    }
    if(directoryType == "documents"){
      this.platform.ready().then(() => {
        this.file.readAsText(this.file.documentsDirectory+directoryName, fileName)
           .then((data) =>{
            let convertedData = JSON.stringify(data);
            let dataResult = JSON.parse(convertedData);
            // alert(dataResult);
            //pass settings data to shaerdService()

        }).catch(error =>{
           let readError = JSON.stringify(error);
           alert(readError);
      })

    });
   }

  }

}






        // this.file.resolveDirectoryUrl(this.file.dataDirectory+directoryName)
        // .then((directoryEntry: DirectoryEntry) => {
        //   this.file.getFile(directoryEntry, fileName, { create: false })
        //   .then((fileEntry: FileEntry) => {

        //     let newFilePath = String(fileEntry.toURL());

        //     this.file.readAsText(this.file.dataDirectory+directoryName, fileName)
        //     .then((data) =>{
        //       alert("read data");
        //       alert(data);
        //     }).catch(error =>{
        //       let readError = JSON.stringify(error);
        //       alert(readError);
        //     })
        //   });
        // });

            // let text = this.file.readAsText(this.dirPath, fileName)
            // .then(data =>{

            //   alert(text);

            // }).catch(error =>{
            //   alert(error);
            // });


        // let result = this.file.readAsText(pathToFile, fileName)
        // result.then(data =>{
        //   console.log(data);
        // console.log(result);
        // alert('file should have been read');
        // }).catch(error =>{

        //   alert("error" + error);
        // });
