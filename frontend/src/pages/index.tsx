import { FormEvent, useEffect, useState } from 'react';

interface Product {
  ProductID: number;
  Name: string;
  Unit: string;
}

interface PlanItem {
  ProductID: number;
  Quantity: number;
  product?: Product;
}

interface Plan {
  PlanID: number;
  Year: number;
  Quarter?: number | null;
  Description?: string | null;
  items: PlanItem[];
}

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [productName, setProductName] = useState('');
  const [productUnit, setProductUnit] = useState('pcs');
  const [planYear, setPlanYear] = useState(new Date().getFullYear());
  const [planQuarter, setPlanQuarter] = useState<number | ''>('');
  const [planDescription, setPlanDescription] = useState('');
  const [planProductId, setPlanProductId] = useState<number | ''>('');
  const [planQuantity, setPlanQuantity] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void refreshProducts();
    void refreshPlans();
  }, []);

  const refreshProducts = async () => {
    const res = await fetch(`${apiBase}/products`);
    if (res.ok) {
      setProducts(await res.json());
    }
  };

  const refreshPlans = async () => {
    const res = await fetch(`${apiBase}/plans`);
    if (res.ok) {
      setPlans(await res.json());
    }
  };

  const onCreateProduct = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    const res = await fetch(`${apiBase}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name: productName, Unit: productUnit }),
    });
    if (!res.ok) {
      setError('Не удалось создать продукт');
      return;
    }
    setProductName('');
    await refreshProducts();
  };

  const onCreatePlan = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    const res = await fetch(`${apiBase}/plans`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        year: planYear,
        quarter: planQuarter === '' ? null : planQuarter,
        description: planDescription || undefined,
        items: planProductId && planQuantity ? [{ productId: planProductId, quantity: planQuantity }] : [],
      }),
    });
    if (!res.ok) {
      setError('Не удалось создать план');
      return;
    }
    setPlanDescription('');
    setPlanQuarter('');
    setPlanProductId('');
    setPlanQuantity('');
    await refreshPlans();
  };

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '2rem', fontFamily: 'system-ui' }}>
      <h1 style={{ marginBottom: '1rem' }}>Production Planner</h1>
      <p style={{ color: '#444' }}>
        Минимальный UI для работы с защищённым API. Настройте переменную окружения
        <code style={{ marginLeft: 4 }}>NEXT_PUBLIC_API_BASE_URL</code> для указания адреса NestJS сервера.
      </p>

      {error && (
        <div style={{ background: '#ffe6e6', border: '1px solid #f5b5b5', padding: '0.5rem 0.75rem', margin: '1rem 0' }}>
          {error}
        </div>
      )}

      <section style={{ marginTop: '2rem' }}>
        <h2>Добавить продукт</h2>
        <form onSubmit={onCreateProduct} style={{ display: 'grid', gap: '0.5rem', maxWidth: 320 }}>
          <label style={{ display: 'grid', gap: 4 }}>
            Название
            <input
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Например, Widget"
              style={{ padding: '0.5rem', border: '1px solid #ccc' }}
            />
          </label>
          <label style={{ display: 'grid', gap: 4 }}>
            Единица измерения
            <input
              required
              value={productUnit}
              onChange={(e) => setProductUnit(e.target.value)}
              placeholder="pcs"
              style={{ padding: '0.5rem', border: '1px solid #ccc' }}
            />
          </label>
          <button type="submit" style={{ padding: '0.5rem', background: '#0b8', color: 'white', border: 'none' }}>
            Сохранить
          </button>
        </form>
        <div style={{ marginTop: '1rem' }}>
          <h3>Список продуктов</h3>
          <ul>
            {products.map((p) => (
              <li key={p.ProductID}>
                #{p.ProductID} {p.Name} ({p.Unit})
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Создать производственный план</h2>
        <form onSubmit={onCreatePlan} style={{ display: 'grid', gap: '0.5rem', maxWidth: 420 }}>
          <label style={{ display: 'grid', gap: 4 }}>
            Год
            <input
              type="number"
              required
              min={2000}
              value={planYear}
              onChange={(e) => setPlanYear(Number(e.target.value))}
              style={{ padding: '0.5rem', border: '1px solid #ccc' }}
            />
          </label>
          <label style={{ display: 'grid', gap: 4 }}>
            Квартал (1-4, необязательно)
            <input
              type="number"
              min={1}
              max={4}
              value={planQuarter}
              onChange={(e) => setPlanQuarter(e.target.value === '' ? '' : Number(e.target.value))}
              style={{ padding: '0.5rem', border: '1px solid #ccc' }}
            />
          </label>
          <label style={{ display: 'grid', gap: 4 }}>
            Описание
            <input
              value={planDescription}
              onChange={(e) => setPlanDescription(e.target.value)}
              style={{ padding: '0.5rem', border: '1px solid #ccc' }}
            />
          </label>
          <label style={{ display: 'grid', gap: 4 }}>
            Продукт
            <select
              value={planProductId}
              onChange={(e) => setPlanProductId(e.target.value === '' ? '' : Number(e.target.value))}
              style={{ padding: '0.5rem', border: '1px solid #ccc' }}
            >
              <option value="">-- выберите --</option>
              {products.map((p) => (
                <option key={p.ProductID} value={p.ProductID}>
                  #{p.ProductID} {p.Name}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: 'grid', gap: 4 }}>
            Количество
            <input
              type="number"
              min={1}
              value={planQuantity}
              onChange={(e) => setPlanQuantity(e.target.value === '' ? '' : Number(e.target.value))}
              style={{ padding: '0.5rem', border: '1px solid #ccc' }}
            />
          </label>
          <button type="submit" style={{ padding: '0.5rem', background: '#0b8', color: 'white', border: 'none' }}>
            Создать план
          </button>
        </form>

        <div style={{ marginTop: '1rem' }}>
          <h3>Существующие планы</h3>
          <ul>
            {plans.map((plan) => (
              <li key={plan.PlanID} style={{ marginBottom: '0.5rem' }}>
                <strong>#{plan.PlanID}</strong> — {plan.Year}
                {plan.Quarter ? ` Q${plan.Quarter}` : ''}
                {plan.Description ? `: ${plan.Description}` : ''}
                <ul>
                  {plan.items.map((item, idx) => (
                    <li key={`${plan.PlanID}-${idx}`}>
                      Продукт #{item.ProductID} — {item.Quantity}
                      {item.product ? ` (${item.product.Name})` : ''}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
