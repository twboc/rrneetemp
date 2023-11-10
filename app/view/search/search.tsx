import React, { FC, useEffect, useState } from 'react'
import {
  removeTrailingSlash,
  removeHttps,
  removeHttp,
  prependHttp
} from '../../util/util'

import './search.css'
import domains from '../../asset/Domains'
import { assignError } from '../../module/Error/Error'
import DomainResults from '../../component/DomainResults/DomainResults'
import { Result } from '../../type/type'

const perPage = 100

const Search: FC = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState({})

  const queryRef = React.useRef(query)
  const setQueryRef = (data: string): void => {
    queryRef.current = data
    setQuery(data)
  }

  const resutlsRef = React.useRef(results)
  const setResultsRef = (data: any): void => {
    resutlsRef.current = data
    setResults(data)
  }

  const executeQuery = async (e: any): Promise<void> => {
    setResults({})
    const requestArray = domains
      .map(removeTrailingSlash)
      .map(removeHttps)
      .map(removeHttp)
      .map(prependHttp)
      .map(async (url: string) => {
        const apiUrl = `${url}/index.php/wp-json/wp/v2/search?search=${queryRef.current}&per_page=${perPage}&page=1`
        await fetch(apiUrl)
          .then(async (response) => {
            const domain = apiUrl.split('/index.php/')[0]
            const result = await response.json()
            setResultsRef({
              ...resutlsRef.current,
              [domain]: result

            })
            return result
          })
          .catch(assignError)
      })

    await Promise.all(requestArray)
  }

  const onEnter = (e: any): void => {
    if (e.key === 'Enter') {
      void executeQuery(e)
    }
  }

  useEffect(() => {
    const node = document.getElementsByClassName('headerInput')[0]
    node.addEventListener('keyup', onEnter)
    return () => { node.removeEventListener('keyup', onEnter) }
  }, [])

  return (
    <div>
        <div className='header'>
            <input className='headerInput' onChange={e => { setQueryRef(e.target.value) }} />
        </div>
        <div className='search-content'>
            {Object.entries(results).map((entry) => {
              return (entry[1] as Result[]).length > 0
                ? <>
                <DomainResults key={entry[0]} domain={entry[0]} results={entry[1] as Result[]} />
                <br/>
                </>
                : <></>
            })}
        </div>
    </div>
  )
}

export default Search


// Blogger Query
// https://www.googleapis.com/blogger/v3/blogs/7438700582880111704/posts/search?key=AIzaSyDCOtjlx8CukLpYJXcvVdc1rDBo6LzN6uk&q=implanty&fetchBodies=false
