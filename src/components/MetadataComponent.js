import React, {useEffect, useRef} from 'react';
import ContentEditable from 'react-contenteditable'
import db from '.././firestore.js' // <----
import firebase from "firebase/app";

const MetadataComponent = ({dataParentToChild}) => {
    
    if(dataParentToChild) {
        //console.log(dataParentToChild)

    }
    const text = useRef('');
    
    

    useEffect(() => {
        // Read data from firestore
        // db.collection("data").doc("0").get()
        // .then(function(doc) {
        // if (doc.exists) {
        //     console.log("Document data:", doc.data());
        //     //setData(doc.data());
        // } else {
        //     // doc.data() will be undefined in this case
        //     console.log("No such document!");
        // }
        // }).catch(function(error) {
        // console.log("Error getting document:", error);
        // });
    }, []);
    
    // On change
    const handleChange = evt => {
        text.current = evt.target.value;
    };

    // When not focused
    const handleBlur = () => {
        console.log(text.current);
    };
    return (
        <div>
            {/* {dataParentToChild.general.name} */}
        </div>
   
      );
}
export default MetadataComponent;