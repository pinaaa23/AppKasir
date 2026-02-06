import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const USE_LOCAL_STORAGE = !isSupabaseConfigured()

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)

      if (USE_LOCAL_STORAGE) {
        // Gunakan localStorage jika Supabase belum dikonfigurasi
        const savedProducts = localStorage.getItem('kasir_products')
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts))
        }
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setProducts(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const addProduct = async (productId, name, price, image) => {
    try {
      if (USE_LOCAL_STORAGE) {
        const newProduct = {
          id: productId || Date.now(),
          name,
          price: parseFloat(price),
          image: image || null
        }
        
        if (productId) {
          // Edit
          const updated = products.map(p => p.id === productId ? newProduct : p)
          setProducts(updated)
          localStorage.setItem('kasir_products', JSON.stringify(updated))
        } else {
          // Add
          const updated = [newProduct, ...products]
          setProducts(updated)
          localStorage.setItem('kasir_products', JSON.stringify(updated))
        }
        return newProduct
      }

      if (productId) {
        const { data, error: updateError } = await supabase
          .from('products')
          .update({
            name,
            price: parseFloat(price),
            image: image || null
          })
          .eq('id', productId)
          .select()

        if (updateError) throw updateError
        setProducts(prev =>
          prev.map(p => p.id === productId ? data[0] : p)
        )
        return data[0]
      } else {
        const { data, error: insertError } = await supabase
          .from('products')
          .insert([
            {
              name,
              price: parseFloat(price),
              image: image || null
            }
          ])
          .select()

        if (insertError) throw insertError
        setProducts(prev => [data[0], ...prev])
        return data[0]
      }
    } catch (err) {
      setError(err.message)
      console.error('Error saving product:', err)
      throw err
    }
  }

  const deleteProduct = async (id) => {
    try {
      if (USE_LOCAL_STORAGE) {
        const updated = products.filter(p => p.id !== id)
        setProducts(updated)
        localStorage.setItem('kasir_products', JSON.stringify(updated))
        return
      }

      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError(err.message)
      console.error('Error deleting product:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct: addProduct,
    deleteProduct,
    refetch: fetchProducts
  }
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTransactions = async () => {
    try {
      setLoading(true)
      setError(null)

      if (USE_LOCAL_STORAGE) {
        const savedTransactions = localStorage.getItem('kasir_transactions')
        if (savedTransactions) {
          setTransactions(JSON.parse(savedTransactions))
        }
        setLoading(false)
        return
      }

      const { data, error: fetchError } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setTransactions(data || [])
    } catch (err) {
      setError(err.message)
      console.error('Error fetching transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTransaction = async (productId, productName, weight, total, price) => {
    try {
      if (USE_LOCAL_STORAGE) {
        const newTransaction = {
          id: Date.now(),
          product_id: productId,
          product_name: productName,
          weight: parseFloat(weight),
          price_per_kg: parseFloat(price),
          total: parseFloat(total),
          created_at: new Date().toISOString()
        }
        const updated = [newTransaction, ...transactions]
        setTransactions(updated)
        localStorage.setItem('kasir_transactions', JSON.stringify(updated))
        return newTransaction
      }

      const { data, error: insertError } = await supabase
        .from('transactions')
        .insert([
          {
            product_id: productId,
            product_name: productName,
            weight: parseFloat(weight),
            price_per_kg: parseFloat(price),
            total: parseFloat(total)
          }
        ])
        .select()

      if (insertError) throw insertError
      setTransactions(prev => [data[0], ...prev])
      return data[0]
    } catch (err) {
      setError(err.message)
      console.error('Error adding transaction:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return {
    transactions,
    loading,
    error,
    addTransaction,
    refetch: fetchTransactions
  }
}
