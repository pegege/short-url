function Historial({ history, setStats }) {
  const obtenerEstadisticas = async (shortUrlCompleto) => {
    try {
      const shortId = shortUrlCompleto.split('/').pop()
      const response = await fetch(`https://short-url-app-67tv.onrender.com/api/urls/stats/${shortId}`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error al obtener estadísticas:', error)
    }
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-2">Historial de URLs acortadas:</h2>
      <ul className="list-disc list-inside space-y-2">
        {history.map((url, index) => (
          <li key={index} className="flex items-center gap-2">
            <button
              onClick={() => obtenerEstadisticas(url)}
              className="text-blue-600 underline break-all text-left w-full"
            >
              {url}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Historial
