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
      // include product buy_price so we can calculate profit even when transaction stored buy_price_at_sale = 0
      .select('*, products(name, sell_price, buy_price)')
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
      status: t.status || 'completed',
      payment_method: t.payment_method || '',
      invoice: t.invoice || '',
      customer_name: t.customer_name || '',
      customer_phone: t.customer_phone || '',
      items: t.items || null,
      proof_url: t.proof_url || null,
      created_at: t.created_at,
      product_name: t.products?.name || 'Unknown',
      product_buy_price: t.products?.buy_price || 0,
      price_per_kg: t.sell_price_at_sale || t.products?.sell_price || 0,  // gunakan harga historis
      // Fallback to product's current buy_price when transaction didn't store it
      buy_price_at_sale: t.buy_price_at_sale || t.products?.buy_price || 0,
      sell_price_at_sale: t.sell_price_at_sale || 0
    }));

    setTransactions(transformed);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTransactions();
  }, []);

  const addTransaction = async (tx) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([tx])
      // Ensure we return a product join with buy_price in case transaction already has 0
      .select('*, products(name, buy_price)')
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
      status: t.status || 'completed',
      payment_method: t.payment_method || '',
      invoice: t.invoice || '',
      customer_name: t.customer_name || '',
      customer_phone: t.customer_phone || '',
      items: t.items || null,
      proof_url: t.proof_url || null,
      created_at: t.created_at,
      product_name: t.products?.name || 'Unknown',
      product_buy_price: t.products?.buy_price || 0,
      price_per_kg: t.sell_price_at_sale || 0,  // gunakan harga historis yang disimpan
      // Fallback to product current buy_price when transaction stored buy_price_at_sale is missing/zero
      buy_price_at_sale: t.buy_price_at_sale || t.products?.buy_price || 0,
      sell_price_at_sale: t.sell_price_at_sale || 0
    };

    setTransactions((prev) => [transformed, ...prev]);
    return transformed;
  };

  const updateTransactionStatus = async (id, status) => {
    const { data, error } = await supabase
      .from('transactions')
      .update({ status })
      .eq('id', id)
      .select('*, products(name, buy_price)')
      .single();

    if (error) throw error;

    const t = data;
    const transformed = {
      id: t.id,
      product_id: t.product_id,
      quantity: t.quantity,
      weight: t.quantity,
      total: t.total,
      status: t.status || 'completed',
      payment_method: t.payment_method || '',
      invoice: t.invoice || '',
      customer_name: t.customer_name || '',
      customer_phone: t.customer_phone || '',
      items: t.items || null,
      proof_url: t.proof_url || null,
      created_at: t.created_at,
      product_name: t.products?.name || 'Unknown',
      price_per_kg: t.sell_price_at_sale || 0,
      buy_price_at_sale: t.buy_price_at_sale || t.products?.buy_price || 0,
      sell_price_at_sale: t.sell_price_at_sale || 0
    };

    setTransactions((prev) => prev.map((t) => (t.id === id ? transformed : t)));
    return transformed;
  };

  const deleteTransaction = async (id) => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    setTransactions((prev) => prev.filter((t) => t.id !== id));
    return true;
  };

  return { transactions, loading, error, fetchTransactions, addTransaction, updateTransactionStatus, deleteTransaction };
}
