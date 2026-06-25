export const environment = {
  production: false,

  // usa proxy — "/" garante URLs relativas à raiz, não à rota atual do Angular
  apiUrl: '/',

  PRODUTOS_PATH:      'api/produtos',
  CATEGORIAS_PATH:    'api/categoria',
  PEDIDOS_PATH:       'api/pedidos',
  ITENS_PEDIDOS_PATH: 'api/itens-pedidos',
  USUARIOS_PATH:      'api/usuarios'
};
