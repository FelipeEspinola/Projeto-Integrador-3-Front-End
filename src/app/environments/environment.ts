export const environment = {
  production: false,

  // usa proxy — precisa ser "/" (raiz absoluta) e não "" (vazio).
  // Com "" as chamadas HTTP ficam relativas à rota atual do Angular,
  // então em rotas com mais de um nível (ex: /admin/novo) a URL
  // resolvida ficava errada (ex: http://localhost:4200/admin/api/produtos
  // em vez de http://localhost:4200/api/produtos).
  apiUrl: '/',

  PRODUTOS_PATH: 'api/produtos',
  CATEGORIAS_PATH: 'api/categoria',
  PEDIDOS_PATH: 'api/pedidos',
  ITENS_PEDIDOS_PATH: 'api/itens-pedidos'
};