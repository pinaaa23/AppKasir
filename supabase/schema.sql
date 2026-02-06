-- Enable pgcrypto for gen_random_uuid()
create extension if not exists pgcrypto;

-- products table with buy_price, sell_price, stock
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  buy_price numeric(12,2) not null default 0,
  sell_price numeric(12,2) not null default 0,
  stock numeric(10,2) not null default 0,
  image text,
  created_at timestamptz default now()
);

-- transactions table with historical prices
create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete set null,
  quantity numeric(12,2) not null,
  buy_price_at_sale numeric(12,2) not null,
  sell_price_at_sale numeric(12,2) not null,
  total numeric(14,2) not null,
  created_at timestamptz default now()
);

create index if not exists idx_products_created_at on products (created_at);
create index if not exists idx_transactions_created_at on transactions (created_at);
