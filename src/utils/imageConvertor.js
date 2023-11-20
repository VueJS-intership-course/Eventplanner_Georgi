import firebase from "firebase/compat/app";
import 'firebase/compat/storage'

function uploadImage(file) {
    return new Promise((resolve, reject) => {

        const storageRef = firebase.storage().ref();
        const collectionRef = storageRef.child('products/subdirectory/' + file.name);

        if (file.size > 1024 * 1024) {
            reject('Image size exceeded 1MB limit');
            return;
        }

        const imageRef = collectionRef.child(file.name);

        imageRef.put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                resolve(downloadURL);
            }).catch(_ => {
                return
            });
        }).catch(_ => {
            return
        });
    });
}34

export default uploadImage

