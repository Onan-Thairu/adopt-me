import { useEffect ,useState } from "react"
import useBreedList from "./useBreedList"
import Results from "./Results"

const ANIMALS = ["birds", "cat", "dog", "rabbit", "reptile"]

const SearchParams = () => {
  const [ location, updateLocation ] = useState("")
  const [ animal, updateAnimal ] = useState("")
  const [ breed, setBreed ] = useState("")
  const [ pets, setPets ] = useState([])

  const [breeds] = useBreedList(animal)

  useEffect(() => {
    requestPets()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`)
    const json = await res.json()
    setPets(json.pets)
  }

  return (
    <div className="search-params">
      <form
        onSubmit={ (e) => {
          e.preventDefault()
          requestPets()
        }} 
      >
        <label htmlFor="location">
          Location
          <input 
            type="text" 
            id="location" 
            value={ location } 
            placeholder="Location"
            onChange={ (e) => updateLocation(e.target.value) }
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select 
            id="animal" 
            value={ animal }
            onChange={ (e) => {
              updateAnimal(e.target.value)
              setBreed("")
            } }
            onBlur={ (e) => {
              updateAnimal(e.target.value)
              setBreed("")
            }}
          >
            
              {
                ANIMALS.map((animal) => {
                  return (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  )
                })
              }
            
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select 
            id="breed"
            disabled={!breeds.length}
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            {
              breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))
            }
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>

      <Results pets={pets} />
 
    </div>
  )
}

export default SearchParams