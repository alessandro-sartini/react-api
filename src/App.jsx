import { useEffect } from "react"
import { useState } from "react"
// import REACT_APP_API_URL from "../"
function App() {

  // const apiUrl= process.env.REACT_APP_API_URL
  const [getTitles, setTitles] = useState([])


  const initialObject = {
      
    title: '',
    content: '',
    tags: []

  };
  // ! controllo dell'oggetto
  const [getDataAdd, setDataAdd] = useState(initialObject)
  
  useEffect(fetchApiTitle,[])

  const apiUrl = 'http://localhost:3000/api/posts/';


  function fetchApiTitle() {
    
    fetch(apiUrl)
      .then((res) => res.json())
      .then(data => {
        
        setTitles(data);
        // console.log(data)

      }) 
      .catch(error => {
        console.error(error)
      })
    
  }
  // fetchApiTitle()

// ! delete function 
  const handleDelete = (idElemento) => {
    
    fetch(` ${apiUrl}/${idElemento}`, {
      
      method: 'DELETE'

    }).then(

      fetchApiTitle()

    )

  };



  // !
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(apiUrl, {
      method: 'POST',
      headers: { "Content-Type": "application/json" }, // Header corretto
      body: JSON.stringify(getDataAdd)
    })
      
      // ! fetch chiede questo approccio diverso
      // todo  headers: { "Content-Type": "application/json" }, 
     //todo  body: JSON.stringify(getDataAdd)
   
      .then(
        fetchApiTitle()
    ).catch((err)=>console.error(err))

    setDataAdd(initialObject);
  }

  const handleField = (event) => {
    
    const { name, value } = event.target;

    if ([name] == "tags") {
      setDataAdd({

          ...getDataAdd,
          [name]:value.split(",").map((t) => t.trim())
        })

    } else {
      

      setDataAdd({
  
        ...getDataAdd,
        [name] : value
  
      })

    }



  }
// !

  return (
    <>
      


      <div className="container">

        {/* ! form per creazione */}

      <form onSubmit={handleSubmit}>

        <label htmlFor="">Name</label>
          <input type="text"
            name="title"
            onChange={handleField}
            value={getDataAdd.title}
          />
        <label htmlFor="">Description</label>
          <input type="text"
            name="content"
            onChange={handleField}
            value={getDataAdd.content}
          />
        <label htmlFor="">Tags</label>
          <input type="text"
            name="tags"
            onChange={handleField}
            value={getDataAdd.tags}
          />
      
          
        <button>Aggiungi</button>

      </form>
        <table>
          <thead>
            <tr>

                {
                getTitles.map(e => <th
                  key={e.id}>
                  {e.title}
                  <button onClick={()=>handleDelete(e.id)} >
                    
                    x</button>
                </th>
                    
                  )
                }

            </tr>
            
          </thead>

          <tbody>
            <tr>

                {
                  getTitles.map(e => <td key={e.id}> {e.content} </td>)
                }

            </tr>
                  
          </tbody>

          <tfoot>

            <tr>
            


                
              
                {

                   getTitles.map(e => <td key={e.id}> <span>{ e.tags}</span> </td> )

                  
                  // getTitles.map((e) => {
                      
                  //   return e.tags.map((tag, idx) => {
                      
                  //        return <span key={idx}>{tag}</span>
 

                  //     })


                  //   })
                  // getTitles.tags.map((tag, idx) => {
                    
                  //  return <li key={idx}>{tag}</li>

                  // })
                  // getTitles.map(e => e.tags.map((tags, idx) => {
                    
                  //   <li key={tags.idx}>{tags.tags}</li>
                    
                  // }))
                    
                  

                    // getTitles.map(e => <td key={e.id}> <span>{ e.tags}</span> </td> )
                }
              
               

              </tr>
                  
          </tfoot>
        


        </table>

      </div>
    </>
  )
}

export default App

