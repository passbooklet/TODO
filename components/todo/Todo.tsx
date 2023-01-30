import useTodo from "../../customHooks/useTodo"
import styles from '../../styles/Todo.module.css'


type todotype = {
    description: string,
    createdAt: object,
    id: string,
}

const Todo = () => {


    //   ------------------------------------------------------------------------------------------
    const {
        input,
        data,
        donetodos,
        loader,
        toggle,
        setinput,
        cancel,
        save,
        checked,
        update,
        onEditHandler,
        canceldone
    } = useTodo()
    //   -------------------------------------------------------------------------------------------------------



    //   -------------------------------------------return started----------------------------------------------

    return (
        <div className={styles.centeraligin}>
        <div className={styles.card}>
        <div className={styles.card2} >
          <h1 className={styles.textcentre}>ToDo list</h1>
          <br />
          <div className={styles.inputgroup}>
            <input
             className={styles.input}
              onChange={(e) => { setinput(e.target.value) }}
              placeholder="add todo"
              type="text"
              value={input} />
            {toggle ? <button onClick={save} className={styles.buttonsubmit} >Add</button> :
              <button onClick={onEditHandler} className={styles.buttonsubmit} >edit</button>
            }
          </div>
          <br/>
          <div>
                   {data.map((item) => {
              return (
                <div key={item.id}>
                  <p className={styles.para}>{item.description}</p>
                  <span className={styles.buttoncentre}>
                  <button className={styles.button1} onClick={() => cancel(item)}>delete</button>
                  <button className={styles.button2}  onClick={() => checked(item)}>checked</button>
                  <button className={styles.button3}  onClick={() => update(item)}>update</button>
                  </span>
                  <br />
                  <br />
                  <br />
                </div>
              )
            })}
            <hr  className={styles.hrline1}/>
            <br/>
            
            <div>
              {donetodos.map((item) => {
                return (
                  <div>
                  <p className={styles.para2}>{item.description}</p>
                  
                  <span className={styles.buttoncentre}>
                  <button className={styles.button1}  onClick={() => canceldone(item)}>delete</button>
                  </span>
                  <br/>
                  </div>

                )
              })}
            </div>
  
          </div>
  
  
  
  
  
          </div>
        </div>
      </div>
    )
}

export default Todo