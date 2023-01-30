import { db } from '../config/databae'
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react"

//   ------------------------------------------------------------------------------------------
type todotype = {
    description: string,
    createdAt: object,
    id: string,
}



//   ------------------------------------------------------------------------------------------


const useTodo = () => {
    //   ------------------------------------------------------------------------------------------

    const [input, setinput] = useState<string>('')
    const [re, setre] = useState<string>('')
    const [data, setdata] = useState<todotype[]>([])
    const [donetodos, setdonetodos] = useState<todotype[]>([])
    const [toggle, settoggle] = useState(true)
    const [loader, setLoader] = useState(true)

    //   ------------------------------------------------------------------------------------------

    useEffect(() => {
        onEditHandler();
        getTodosHandler();
        getdoneHandler();
    }, [])



    //   ------------------------------------------------------------------------------------------


    const save = async () => {
        if (!input) {
            alert("fill the task")
            setLoader(true)

        } else {
            // to import data to firebase
            try {
                const newDoc = {
                    description: input,
                    createdAt: new Date(),
                }
                const docRef1 = await addDoc(collection(db, "todo"), newDoc);
                setdata([...data, { ...newDoc, id: docRef1.id }])
            }
            catch (e) {
                console.error(e);
            }
        }
        setinput("")
    }

    // to display form the firebase
    const getTodosHandler = async () => {
        // getting todo data form firestore
        try {
            const querySnapshot = await getDocs(collection(db, "todo"));
            let datalist: todotype[] = []
            querySnapshot.forEach((doc) => {
                datalist.push({
                    description: doc.data().description,
                    id: doc.id,
                    createdAt: doc.data().createdAt
                });
            });
            setdata(datalist);
        } catch (error) {
            console.log('================catch====================');
            console.log(error);
            console.log('====================================');
        } finally {
            setLoader(false)
        }
    }
    //   ------------------------------------------------------------------------------------------


    // to delete the todo from firebase
    const cancel = async (item: todotype) => {
        try {
            await deleteDoc(doc(db, "todo", item.id));
            let filtered = data.filter((e) => {
                if (item.id != e.id)
                    return e
            })
            setdata(filtered)
        } catch (error) {
            console.log('================catch====================');
            console.log(error);
            console.log('====================================');
        }
    }


    //   ------------------------------------------------------------------------------------------


    // to add donetodos to firestore
    const checked = async (item: todotype) => {

        // adding the description value to the new data
        try {
            let newdone = {
                description: item.description,
                createdAt: new Date
            }
            // adding the data in the firebase 
            const docRef2 = await addDoc(collection(db, "donetodo"), newdone);
            setdonetodos([...donetodos, { ...newdone, id: docRef2.id }]);
            //  delete after adding the donetodos from todo in firebase  
            await deleteDoc(doc(db, "todo", item.id));
            let filtered: todotype[] = data.filter((e) => {
                if (item.id != e.id)
                    return e
            })
            setdata(filtered)
        } catch (error) {
            console.log('================catch====================');
            console.log(error);
            console.log('====================================');
        }
    }

    // to get donetodes from the firestore
    const getdoneHandler = async () => {
        try {
            // getting add form donetodo in firebase
            const querySnapshot = await getDocs(collection(db, "donetodo"));
            let datalist1: todotype[] = []
            querySnapshot.forEach((doc) => {
                datalist1.push({
                    description: doc.data().description,
                    id: doc.id,
                    createdAt: doc.data().createdAt
                });
            });
            setdonetodos(datalist1);
        } catch (error) {
            console.log('================catch====================');
            console.log(error);
            console.log('====================================');
        }
    }

    // 
    const canceldone = async (item: todotype) => {
        // to delete the data form donetodo
        try {
            await deleteDoc(doc(db, "donetodo", item.id));
            let filtered = data.filter((e) => {
                if (item.id != e.id)
                    return e
            })
            setdata(filtered)
        } catch (error) {
            console.log('================catch====================');
            console.log(error);
            console.log('====================================');
        }
    }

    //   ------------------------------------------------------------------------------------------


    const update = (item: todotype) => {
        // storing id in state re and the description in input
        settoggle(false)
        setinput(item.description)
        setre(item.id)
    }

    const onEditHandler = async () => {
        try {
            await updateDoc(doc(db, "todo", re), {
                description: input,
            });
            let updatedItem = {
                description: input,
                createdAt: new Date,
                id: re
            }
            let updatedTodos = data.map((todo) => {
                if (re == todo.id) {
                    return updatedItem
                }
                else {
                    return todo
                }
            })
            setdata(updatedTodos);
            settoggle(true);
            setinput("")
        } catch (error) {
            console.log('================catch====================');
            console.log(error);
            console.log('====================================');
        }
    }


    //   -------------------------------------------------------------------------------------------------------



    //   -------------------------------------------return started----------------------------------------------

    return {
   input,
   data,
   re,
   donetodos,
   loader,
   toggle,
   setLoader,
   setinput,
   setdata,
   setre,
   setdonetodos,
   settoggle,
   cancel,
   save,
   checked,
   update,
   onEditHandler,
   getTodosHandler,
   canceldone
    }

}
export default useTodo