const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKeY.json");
const data = require("./data.json");
const collectionKey = "students";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:""
});

const firestore = admin.firestore();

const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

if(data && (typeof data === "object")){
    Object.keys(data).forEach(docKey=>{
        firestore.collection(collectionKey)
        .doc(+new Date)
        .set(data[docKey])
        .then((res)=>{
            console.log("Document "+docKey+" successfully written!");
        }).catch((error)=>{
            console.error("Error writing document: ", error);
        })
    })
}