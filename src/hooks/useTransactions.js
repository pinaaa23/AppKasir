import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*, products(name, sell_price)')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    // Transform data to flatten product info dan gunakan harga historis
    const transformed = (data || []).map(t => ({
      id: t.id,
      product_id: t.product_id,
      quantity: t.quantity,
      weight: t.quantity,
      total: t.total,
      created_at: t.created_at,
      product_name: t.products?.name || 'Unknown',
      price_per_kg: t.sell_price_at_sale || t.products?.sell_price || 0,  // gunakan harga historis
      buy_price_at_sale: t.buy_price_at_sale || 0,
      sell_price_at_sale: t.sell_price_at_sale || 0
    }));

    setTransactions(transformed);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const addTransaction = async (tx) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([tx])
      .select('*, products(name)')
      .single();

    if (error) throw error;

    // Transform the newly inserted row to match the flattened shape
    const t = data;
    const transformed = {
      id: t.id,
      product_id: t.product_id,
      quantity: t.quantity,
      weight: t.quantity,
      total: t.total,
      created_at: t.created_at,
      product_name: t.products?.name || 'Unknown',
      price_per_kg: t.sell_price_at_sale || 0,  // gunakan harga historis yang disimpan
      buy_price_at_sale: t.buy_price_at_sale || 0,
      sell_price_at_sale: t.sell_price_at_sale || 0
    };

    setTransactions((prev) => [transformed, ...prev]);
    return transformed;
  };

  return { transactions, loading, error, fetchTransactions, addTransaction };
}
