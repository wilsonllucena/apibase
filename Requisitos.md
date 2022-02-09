## LOJA VIRTUAL COM PLANO DE FIDELIDADE PAGAMENTOS VARIADOS E PIX

## USUARIO 

[ ] Deve ser possivel cadastrar
[ ] Deve ser possivel listar todos
[ ] Deve ser possivel listar por id
[ ] Deve ser possivel deletar
[ ] Deve ser possivel Editar

## PRODUTOS 

schema:   {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    
  },
  { timestamps: true }

[ ] Deve ser possivel cadastrar
[ ] Deve ser possivel listar todos
[ ] Deve ser possivel listar por id
[ ] Deve ser possivel deletar
[ ] Deve ser possivel Editar

## CARRINHO 

schema : 
   {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ]
  },
  { timestamps: true }

[ ] Deve ser possivel cadastrar
[ ] Deve ser possivel listar todos
[ ] Deve ser possivel listar por id
[ ] Deve ser possivel deletar
[ ] Deve ser possivel Editar

## ORDER 
schema : 
   {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }

