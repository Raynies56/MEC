
export default function DebugPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Diagnóstico de Conexión</h1>
      <p>ID de Base de Datos actual:</p>
      <code style={{ background: '#eee', padding: '5px', fontSize: '1.2rem' }}>
        {process.env.NEXT_PUBLIC_SUPABASE_URL || 'No configurada'}
      </code>
      <p style={{ marginTop: '20px', color: 'red' }}>
        * Borraremos esta página en cuanto terminemos la prueba.
      </p>
    </div>
  );
}
