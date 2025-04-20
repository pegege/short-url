import { useState } from 'react'
import './App.css'
import Historial from './components/Historial'
import Estadisticas from './components/Estadisticas'
import { FiCopy } from 'react-icons/fi'


function App() {
  const [originalUrl, setOriginalUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState([])
  const [stats, setStats] = useState(null)

  const handleShorten = async () => {
    try {
      const response = await fetch('https://short-url-app-67tv.onrender.com/api/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalUrl }),
      })

      const data = await response.json()
      const nuevaUrl = `https://short-url-app-67tv.onrender.com/${data.shortUrl}`
      setShortUrl(nuevaUrl)
      setHistory((prev) => [...prev, nuevaUrl])
      setOriginalUrl('')
      setCopied(false)
    } catch (error) {
      console.error('Error al acortar la URL:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Acortar URL</h1>

        <input
          type="text"
          placeholder="Introduce una URL larga"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleShorten}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Acortar
        </button>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="mb-2">Tu URL acortada es:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {shortUrl}
            </a>
              
            <button
              className="
                mt-6
                bg-green-600 
                text-white 
                px-4 
                py-2 
                rounded-lg 
                font-semibold 
                hover:bg-green-700 
                hover:scale-105 
                hover:shadow-md 
                transition-all 
                duration-200
              "
              onClick={() => {
                navigator.clipboard.writeText(shortUrl)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
            >
              <FiCopy className="inline-block mr-2" />
              {copied ? 'Copiado!' : 'Copiar URL'}
            </button>


            {copied && (
              <div className="mt-2 text-green-600 text-sm">
                URL copiada al portapapeles!
              </div>
            )}
          </div>
        )}

        <Historial history={history} setStats={setStats} />
        {stats && <Estadisticas stats={stats} />}
      </div>
    </div>
  )
}

export default App
