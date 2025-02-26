import { useEffect } from "react"
import { useState } from "react"

function App() {

  const [getTitles, setTitles] = useState([])
  
  useEffect(fetchApiTitle,[])


  function fetchApiTitle() {
    
    fetch('http://localhost:3000/api/posts/')
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

  return (
    <>
      <div className="container">
        <table>
          <thead>
            <tr>

                {
                  getTitles.map(e =><th key={e.id}>{e.title}</th>
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

9