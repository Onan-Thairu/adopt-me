import { useState } from "react"

const SearchParams = () => {
  const [ location, updateLocation ] = useState("")
  return (
    <div className="search-params">
      <form>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default SearchParams