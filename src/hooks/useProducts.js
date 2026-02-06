import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error('fetchProducts error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = async (product) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select()
        .single();
      
      if (error) throw error;
      if (!data) throw new Error('No data returned from insert');
      
      setProducts((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      console.error('addProduct error:', err);
      throw err;
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      if (!data) throw new Error('No data returned from update');
      
      setProducts((prev) => prev.map((p) => (p.id === id ? data : p)));
      return data;
    } catch (err) {
      console.error('updateProduct error:', err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('deleteProduct error:', err);
      throw err;
    }
  };

  return { products, loading, error, fetchProducts, addProduct, updateProduct, deleteProduct };
}
