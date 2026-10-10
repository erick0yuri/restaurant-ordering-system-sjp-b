-- Tabela de categorias
create table if not exists categories (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    icon text,
    display_order integer default 0,
    active boolean default true
);

-- Tabela de produtos
create table if not exists products (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    price numeric(10, 2) not null check (price >= 0),
    category_id uuid references categories(id) on delete set null
);

-- Se a tabela products já existe no seu Supabase sem a coluna category_id:
alter table products
    add column if not exists category_id uuid references categories(id) on delete set null;
