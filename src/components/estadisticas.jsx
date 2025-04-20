function Estadisticas({ stats }) {
    return (
      <div className="mt-6 p-4 bg-gray-50 rounded shadow text-sm">
        <h3 className="font-bold mb-2 text-blue-700">📊 Estadísticas:</h3>
        <p><strong>Clicks:</strong> {stats.clicks}</p>
        <p><strong>Creado el:</strong> {new Date(stats.createdAt).toLocaleDateString()}</p>
        <p><strong>Expira el:</strong> {new Date(stats.expiresAt).toLocaleDateString()}</p>
      </div>
    )
  }
  
  export default Estadisticas
  