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

interface Material {
  MaterialID: number;
  Name: string;
  Category?: string | null;
  Unit: string;
}

interface Warehouse {
  WarehouseID: number;
  Name: string;
  Location?: string | null;
}

interface InventoryRow {
  MaterialID: number;
  WarehouseID: number;
  CurrentStock: number;
  material?: Material;
  warehouse?: Warehouse;
}

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [inventory, setInventory] = useState<InventoryRow[]>([]);

  const [productName, setProductName] = useState('');
  const [productUnit, setProductUnit] = useState('pcs');

  const [planYear, setPlanYear] = useState(new Date().getFullYear());
  const [planQuarter, setPlanQuarter] = useState<number | ''>('');
  const [planDescription, setPlanDescription] = useState('');
  const [planProductId, setPlanProductId] = useState<number | ''>('');
  const [planQuantity, setPlanQuantity] = useState<number | ''>('');

  const [materialName, setMaterialName] = useState('');
  const [materialCategory, setMaterialCategory] = useState('');
  const [materialUnit, setMaterialUnit] = useState('kg');

  const [warehouseName, setWarehouseName] = useState('');
  const [warehouseLocation, setWarehouseLocation] = useState('');

  const [inventoryMaterialId, setInventoryMaterialId] = useState<number | ''>('');
  const [inventoryWarehouseId, setInventoryWarehouseId] = useState<number | ''>('');
  const [inventoryStock, setInventoryStock] = useState<number | ''>('');

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void refreshAll();
  }, []);

  const refreshAll = async () => {
    await Promise.all([refreshProducts(), refreshPlans(), refreshMaterials(), refreshWarehouses(), refreshInventory()]);
  };

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

  const refreshMaterials = async () => {
    const res = await fetch(`${apiBase}/materials`);
    if (res.ok) {
      setMaterials(await res.json());
    }
  };

  const refreshWarehouses = async () => {
    const res = await fetch(`${apiBase}/warehouses`);
    if (res.ok) {
      setWarehouses(await res.json());
    }
  };

  const refreshInventory = async () => {
    const res = await fetch(`${apiBase}/inventory`);
    if (res.ok) {
      setInventory(await res.json());
    }
  };

  const onCreateProduct = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

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
    setMessage('Продукт сохранён');
    await refreshProducts();
  };

  const onCreatePlan = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

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
    setMessage('План сохранён');
    await refreshPlans();
  };

  const onCreateMaterial = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const res = await fetch(`${apiBase}/materials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name: materialName, Category: materialCategory || undefined, Unit: materialUnit }),
    });
    if (!res.ok) {
      setError('Не удалось создать материал');
      return;
    }
    setMaterialName('');
    setMaterialCategory('');
    setMessage('Материал сохранён');
    await refreshMaterials();
  };

  const onCreateWarehouse = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const res = await fetch(`${apiBase}/warehouses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name: warehouseName, Location: warehouseLocation || undefined }),
    });
    if (!res.ok) {
      setError('Не удалось создать склад');
      return;
    }
    setWarehouseName('');
    setWarehouseLocation('');
    setMessage('Склад сохранён');
    await refreshWarehouses();
  };

  const onUpsertInventory = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const res = await fetch(`${apiBase}/inventory`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        materialId: inventoryMaterialId,
        warehouseId: inventoryWarehouseId,
        currentStock: inventoryStock,
      }),
    });
    if (!res.ok) {
      setError('Не удалось обновить остатки');
      return;
    }
    setInventoryMaterialId('');
    setInventoryWarehouseId('');
    setInventoryStock('');
    setMessage('Остатки обновлены');
    await refreshInventory();
  };

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem', fontFamily: 'system-ui' }}>
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

      {message && (
        <div style={{ background: '#e6ffed', border: '1px solid #b5f5c5', padding: '0.5rem 0.75rem', margin: '1rem 0' }}>
          {message}
        </div>
      )}

      <section style={{ display: 'grid', gap: '2rem' }}>
        <div>
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
        </div>

        <div>
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
        </div>

        <div>
          <h2>Материалы</h2>
          <form onSubmit={onCreateMaterial} style={{ display: 'grid', gap: '0.5rem', maxWidth: 420 }}>
            <label style={{ display: 'grid', gap: 4 }}>
              Название
              <input
                required
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
                style={{ padding: '0.5rem', border: '1px solid #ccc' }}
              />
            </label>
            <label style={{ display: 'grid', gap: 4 }}>
              Категория (опционально)
              <input
                value={materialCategory}
                onChange={(e) => setMaterialCategory(e.target.value)}
                style={{ padding: '0.5rem', border: '1px solid #ccc' }}
              />
            </label>
            <label style={{ display: 'grid', gap: 4 }}>
              Единица
              <input
                required
                value={materialUnit}
                onChange={(e) => setMaterialUnit(e.target.value)}
                placeholder="kg"
                style={{ padding: '0.5rem', border: '1px solid #ccc' }}
              />
            </label>
            <button type="submit" style={{ padding: '0.5rem', background: '#0b8', color: 'white', border: 'none' }}>
              Сохранить материал
            </button>
          </form>
          <div style={{ marginTop: '1rem' }}>
            <h3>Список материалов</h3>
            <ul>
              {materials.map((m) => (
                <li key={m.MaterialID}>
                  #{m.MaterialID} {m.Name} ({m.Unit}) {m.Category ? `— ${m.Category}` : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2>Склады</h2>
          <form onSubmit={onCreateWarehouse} style={{ display: 'grid', gap: '0.5rem', maxWidth: 420 }}>
            <label style={{ display: 'grid', gap: 4 }}>
              Название склада
              <input
                required
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}
                style={{ padding: '0.5rem', border: '1px solid #ccc' }}
              />
            </label>
            <label style={{ display: 'grid', gap: 4 }}>
              Локация (опционально)
              <input
                value={warehouseLocation}
                onChange={(e) => setWarehouseLocation(e.target.value)}
                style={{ padding: '0.5rem', border: '1px solid #ccc' }}
              />
            </label>
            <button type="submit" style={{ padding: '0.5rem', background: '#0b8', color: 'white', border: 'none' }}>
              Сохранить склад
            </button>
          </form>
          <div style={{ marginTop: '1rem' }}>
            <h3>Список складов</h3>
            <ul>
              {warehouses.map((w) => (
                <li key={w.WarehouseID}>
                  #{w.WarehouseID} {w.Name} {w.Location ? `— ${w.Location}` : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2>Запасы материалов</h2>
          <form onSubmit={onUpsertInventory} style={{ display: 'grid', gap: '0.5rem', maxWidth: 520 }}>
            <label style={{ display: 'grid', gap: 4 }}>
              Материал
              <select
                required
                value={inventoryMaterialId}
                onChange={(e) => setInventoryMaterialId(e.target.value === '' ? '' : Number(e.target.value))}
                style={{ padding: '0.5rem', border: '1px solid #ccc' }}
              >
                <option value="">-- выберите --</option>
                {materials.map((m) => (
                  <option key={m.MaterialID} value={m.MaterialID}>
                    #{m.MaterialID} {m.Name}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: 'grid', gap: 4 }}>
              Склад
              <select
                required
                value={inventoryWarehouseId}
                onChange={(e) => setInventoryWarehouseId(e.target.value === '' ? '' : Number(e.target.value))}
                style={{ padding: '0.5rem', border: '1px solid #ccc' }}
              >
                <option value="">-- выберите --</option>
                {warehouses.map((w) => (
                  <option key={w.WarehouseID} value={w.WarehouseID}>
                    #{w.WarehouseID} {w.Name}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: 'grid', gap: 4 }}>
              Остаток
              <input
                type="number"
                min={0}
                step={0.01}
                required
                value={inventoryStock}
                onChange={(e) => setInventoryStock(e.target.value === '' ? '' : Number(e.target.value))}
                style={{ padding: '0.5rem', border: '1px solid #ccc' }}
              />
            </label>
            <button type="submit" style={{ padding: '0.5rem', background: '#0b8', color: 'white', border: 'none' }}>
              Обновить остатки
            </button>
          </form>

          <div style={{ marginTop: '1rem' }}>
            <h3>Текущие остатки</h3>
            <ul>
              {inventory.map((row) => (
                <li key={`${row.MaterialID}-${row.WarehouseID}`}>
                  Материал #{row.MaterialID} {row.material ? `(${row.material.Name})` : ''} на складе #{row.WarehouseID}{' '}
                  {row.warehouse ? `(${row.warehouse.Name})` : ''}: {row.CurrentStock}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
