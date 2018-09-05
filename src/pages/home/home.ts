import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages : any;
  private db = firebase.firestore();
  model : any ={};
  isEditing : boolean = false;

  constructor(public navCtrl: NavController) {
    this.db = firebase.firestore();
    this.loadData();
  }

  loadData(){
    this.getAllDocuments("messages").then((e) => {
      this.messages = e;
    })
  }

  addMessage(){
    if(!this.isEditing){
      this.addDocument("messages", this.model).then(()=> {
        this.loadData();
      });
    }else{
      this.updateDocument("messages", this.model.$key, this.model).then(() => {
        this.loadData();
      })
    }

    this.isEditing = false;
    this.model.title = "";
    this.model.text = ""; 
  }

  updateMessage(obj){
    this.model = obj;
    this.isEditing = true;
  }

  deleteMessage(key){
    this.deleteDocument("message", key).then(()=>{
      this.isEditing = false;
      this.loadData();
    })
  }

  getAllDocuments(collection : string){
    return new Promise((resolve, reject) => {
      this.db.collection(collection)
      .get()
      .then((querySnapShot) => {
        let arr = [];
        querySnapShot.forEach(function(doc){
          var obj = JSON.parse(JSON.stringify(doc.data()));
          obj.$key = doc.id
          //console.log(obj)
          arr.push(obj);
        });

        if(arr.length > 0){
          //console.log("Document data: ", arr);
          resolve(arr);
        }else{
          //console.log("No such document");
          resolve(null);
        }
      })
      .catch((error : any) => {
        reject(error);
      });
    });
  }

  addDocument(collectionName : string, dataObj : any) : Promise<any>{
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).add(dataObj)
      .then((obj : any) => {
        resolve(obj);
      })
      .catch((error : any) => {
        reject(error);
      });
    });
  }

  updateDocument(collectionName: string, docId: string, dataObj: any) : Promise<any>{
    return new Promise((resolve, reject) => {
      this.db
          .collection(collectionName)
          .doc(docId)
          .update(dataObj)
          .then((obj : any) => {
            resolve(obj);
            console.log(collectionName);
            console.log(docId);
          })
          .catch((error : any) => {
            reject(error);
          })
    })
  }

  deleteDocument(collectionName: string, docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
        console.log(collectionName);
        this.db.doc('messages/'+ docID)
            .delete()
            .then((obj: any) => {
                console.log('Item deleted successfully')
                resolve(obj);
            })
            .catch((error: any) => {
                reject(error);
            });
    });
  }

}
