import { useState } from 'react'
import './App.css'

function App() {
  // Estado para guardar lo que el usuario escribe
  const [originalUrl, setOriginalUrl] = useState('')
  // Estado para guardar el resultado (URL corta)
  const [shortUrl, setShortUrl] = useState('')

  // Esta función se ejecuta cuando haces clic en el botón
  const handleShorten = async () => {
    try {
      const response = await fetch('https://short-url-app-67tv.onrender.com/api/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }), // Enviamos la URL que el usuario escribió
      })

      const data = await response.json() // Esperamos la respuesta
      setShortUrl(`https://short-url-app-67tv.onrender.com/api/urls${data.shortUrl}`) // Guardamos la URL acortada
    } catch (error) {
      console.error('Error al acortar la URL:', error)
    }
  }

  return (
    <>
      <h1>Acortar URL</h1>

      {/* Campo donde el usuario escribe la URL */}
      <input
        type="text"
        placeholder="URL a acortar"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />

      {/* Botón para acortar */}
      <button onClick={handleShorten}>Acortar</button>

      {/* Mostrar la URL corta si existe */}
      {shortUrl && (
        <p>
          Tu URL acortada es:{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </>
  )
}

export default App
