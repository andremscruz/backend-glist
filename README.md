# Grocery Backend API 🥦

Este é o backend de uma aplicação de lista de compras em tempo real com:

- **Node.js + Express**
- **MongoDB + Mongoose**
- **Socket.IO** para sincronização em tempo real entre usuários

## Como rodar localmente

```bash
cd grocery-backend
npm install
cp .env.example .env # ou crie manualmente o arquivo .env
npm run dev
```

### Exemplo de `.env`

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/groceries?retryWrites=true&w=majority
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## Endpoints principais

- `GET /api/groceries` → lista todos os itens
- `POST /api/groceries` → adiciona item
- `PUT /api/groceries/:id` → atualiza item
- `DELETE /api/groceries/:id` → remove item

## Socket.IO Events

- `item-added`
- `item-updated`
- `item-deleted`

---

Se curtir esse projeto, dá uma ⭐ no repositório! 😄
