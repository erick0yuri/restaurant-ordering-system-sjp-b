import express from "express";

const app = express();

const categories = [
        {
            "id": 1,
            "name": "Pizzas",
            "description": "Pizzas salgadas com diversos sabores, ingredientes e tamanhos."
        },
        {
            "id": 2,
            "name": "Bebidas",
            "description": "Refrigerantes, sucos, águas e outras opções para acompanhar a pizza."
        },
        {
            "id": 3,
            "name": "Sobremesas",
            "description": "Sobremesas deliciosas para finalizar a refeição com chave de ouro."
        }
]

const products = [
        {
            "id": 1,
            "categoryid": 1,
            "name": "Pizza Calabresa",
            "description": "Molho de tomate, queijo muçarela, calabresa fatiada e cebola.",
            "price": 45.90
        },
        {
            "id": 2,
            "categoryid": 1,
            "name": "Pizza Margherita",
            "description": "Molho de tomate, queijo muçarela, tomate e manjericão.",
            "price": 42.90
        },
        {
            "id": 3,
            "categoryid": 2,
            "name": "Coca-Cola 2L",
            "description": "Refrigerante Coca-Cola de 2 litros.",
            "price": 12.90
        },
        {
            "id": 4,
            "categoryid": 3,
            "name": "Pizza de Chocolate",
            "description": "Pizza doce com chocolate ao leite e granulado.",
            "price": 39.90
        }
]

app.get("/", (req, res) => {
    res.status(200).json({
        message: "API Restaurante",
        version: "1.0.0"
    });
});

app.get("/categories", (req, res) => {
    res.status(200).json(categories);
});

app.get("/products", (req, res) => {
    res.status(200).json(products);
});

export default app;