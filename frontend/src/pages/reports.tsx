import { useEffect, useState } from 'react';

interface MaterialNeedRow {
  Material: string;
  TotalNeed: number;
}

interface ConsumptionNormRow {
  Product: string;
  Material: string;
  QuantityPerUnit: number;
}

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export default function ReportsPage() {
  const [materialNeed, setMaterialNeed] = useState<MaterialNeedRow[]>([]);
  const [consumptionNorms, setConsumptionNorms] = useState<ConsumptionNormRow[]>([]);
  const [materialNeedLoading, setMaterialNeedLoading] = useState(false);
  const [consumptionLoading, setConsumptionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchMaterialNeed();
    void fetchConsumptionNorms();
  }, []);

  const fetchMaterialNeed = async (planId = 1) => {
    setMaterialNeedLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/reports/material-need/${planId}`);
      if (!res.ok) {
        throw new Error('Не вдалося отримати потребу у матеріалах');
      }
      const data: MaterialNeedRow[] = await res.json();
      setMaterialNeed(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setMaterialNeedLoading(false);
    }
  };

  const fetchConsumptionNorms = async () => {
    setConsumptionLoading(true);
    setError(null);
    try {
      const res = await fetch(`${apiBase}/reports/consumption-norms`);
      if (!res.ok) {
        throw new Error('Не вдалося отримати норми витрат');
      }
      const data: ConsumptionNormRow[] = await res.json();
      setConsumptionNorms(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setConsumptionLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Звіти</h1>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => void fetchMaterialNeed()} disabled={materialNeedLoading}>
          {materialNeedLoading ? 'Завантаження...' : 'Показати потребу у матеріалах'}
        </button>
        <button onClick={() => void fetchConsumptionNorms()} disabled={consumptionLoading}>
          {consumptionLoading ? 'Завантаження...' : 'Показати норми витрат'}
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section style={{ marginBottom: '2rem' }}>
        <h2>Потреба у матеріалах (План 1)</h2>
        {materialNeedLoading ? (
          <p>Завантаження...</p>
        ) : (
          <table border={1} cellPadding={8} cellSpacing={0}>
            <thead>
              <tr>
                <th>Material</th>
                <th>TotalNeed</th>
              </tr>
            </thead>
            <tbody>
              {materialNeed.length === 0 ? (
                <tr>
                  <td colSpan={2}>Немає даних</td>
                </tr>
              ) : (
                materialNeed.map((row, idx) => (
                  <tr key={`${row.Material}-${idx}`}>
                    <td>{row.Material}</td>
                    <td>{row.TotalNeed}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>

      <section>
        <h2>Норми витрат продукції</h2>
        {consumptionLoading ? (
          <p>Завантаження...</p>
        ) : (
          <table border={1} cellPadding={8} cellSpacing={0}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Material</th>
                <th>QuantityPerUnit</th>
              </tr>
            </thead>
            <tbody>
              {consumptionNorms.length === 0 ? (
                <tr>
                  <td colSpan={3}>Немає даних</td>
                </tr>
              ) : (
                consumptionNorms.map((row, idx) => (
                  <tr key={`${row.Product}-${row.Material}-${idx}`}>
                    <td>{row.Product}</td>
                    <td>{row.Material}</td>
                    <td>{row.QuantityPerUnit}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
