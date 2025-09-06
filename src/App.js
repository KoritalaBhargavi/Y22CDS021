import React, { useState, useEffect } from "react"
import './App.css'

function App() {
  const [url, setUrl] = useState("")
  const [shorts, setShorts] = useState([])
  const [msg, setMsg] = useState("")

  useEffect(() => {
    const d = localStorage.getItem("shorts")
    if (d) {
      setShorts(JSON.parse(d))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("shorts", JSON.stringify(shorts))
  }, [shorts])

  function mkShort() {
    if (!url) {
      setMsg("Please enter a URL")
      return
    }
    const sh = Math.random().toString(36).substring(2, 7)
    const newOne = { full: url, short: sh }
    setShorts([...shorts, newOne])
    setUrl("")
    setMsg("URL shortened successfully!")
  }

  function openShort(s) {
    const upd = shorts.map(x => {
      if (x.short === s) {
        window.open(x.full, "_blank")
      }
      return x
    })
    setShorts(upd)
  }

  return (
    <div className="inter">
      <h2>URL Shortener</h2>
      <input
        value={url}
        onChange={e => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={mkShort}>Shorten URL</button>
      <p>{msg}</p>
      <h3>All URLs</h3>
      <ul>
        {shorts.map((u, i) => (
          <li key={i}>
            {u.full} <a href="#" onClick={() => openShort(u.short)}>/{u.short}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
