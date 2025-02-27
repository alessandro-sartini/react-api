import { useEffect } from "react"
import { useState } from "react"
// import REACT_APP_API_URL from "../"
function App() {

  // const apiUrl= process.env.REACT_APP_API_URL
  const [getTitles, setTitles] = useState([])
  
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


  const handleDelete = (idElemento) => {
    
    fetch(` ${apiUrl}/${idElemento}`, {
      
      method: 'DELETE'

    }).then(

      fetchApiTitle()

    )

  };




  return (
    <>
      <div className="container">
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
                }
              </tr>
                  
          </tfoot>
        


        </table>

      </div>
    </>
  )
}

export default App

