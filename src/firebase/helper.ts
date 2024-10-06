import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	// onSnapshot,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from './firebase';

const generateRandomID = () => {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomID = '';

	for (let i = 0; i < 16; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomID += characters.charAt(randomIndex);
	}
	return randomID;
};

export const uploadImage = async(imageFile: File, id: string) => {
	const storage = getStorage();
	let imageUrl = '';
	if (imageFile) {
		const storageRef = ref(storage, `images/${id}`);
		const snapshot = await uploadBytes(storageRef, imageFile);
		imageUrl = await getDownloadURL(snapshot.ref);
	}
	return imageUrl;
};

export const createData = async(collectionName: string, data: object, imageFile?: File) => {
	const id = generateRandomID();
	try {
		let imageUrl = '';
		if (imageFile) {
			imageUrl = await uploadImage(imageFile, id);
		}
		const docRef = doc(db, collectionName, id);
		const args = {
			id,
			image: imageUrl,
			...data,
		};
		await setDoc(docRef, args);
		return args;
	} catch (error) {
		return false;
	}
};

export const readData = async(collection: string, id: string) => {
	try {
		const docRef = doc(db, collection, id);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			return false;
		}
	} catch (error: any) {
		console.error('Error reading document: ', error.message);
	}
};

export const updateData = async(
	collection: string,
	id: string,
	data: object,
	imageFile?: File
) => {
	try {
		let imageUrl = '';
		if (imageFile) {
			imageUrl = await uploadImage(imageFile, id);
		}
		const docRef = doc(db, collection, id);
		await updateDoc(docRef, {
			id: id,
			image: imageUrl,
			...data,
		});
	} catch (error: any) {
		console.error('Error updating document: ', error.message);
	}
};

export const deleteData = async(collection: string, id: string) => {
	try {
		const docRef = doc(db, collection, id);
		await deleteDoc(docRef);
	} catch (error: any) {
		console.error('Error deleting document: ', error.message);
	}
};

export const readAllData = async(collectionName: string) => {
	try {
		const newDataArr: any = [];
		const querySnapshot = await getDocs(collection(db, collectionName));
		querySnapshot.forEach((doc) => {
			newDataArr.push(doc.data());
		});
		return newDataArr;
	} catch (error: any) {
		console.error('Error reading collection: ', error.message);
	}
};

// export const listenToCollection = (collectionName: string, callback: any) => {
// 	const collectionRef = collection(db, collectionName);

// 	return onSnapshot(collectionRef, (querySnapshot) => {
// 		const newDataArr: any = [];
// 		querySnapshot.forEach((doc) => {
// 			newDataArr.push(doc.data());
// 		});
// 		callback(newDataArr);
// 	});
// };
