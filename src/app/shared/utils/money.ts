/**
 * Converte um valor de preço (número OU texto no formato brasileiro,
 * ex: "19,90", "R$ 1.234,56") em um number JS válido.
 *
 * Por que isso existe: o campo de preço usa máscara com vírgula como
 * separador decimal (formato BR). `Number("19,90")` retorna NaN, porque
 * o JS só entende ponto como decimal — e isso fazia o preço ser salvo
 * como 0 sempre que o valor tinha centavos.
 */
export function parseMoeda(valor: unknown): number {
  if (typeof valor === 'number') {
    return isNaN(valor) ? 0 : valor;
  }

  if (valor === null || valor === undefined) return 0;

  const texto = String(valor).trim();
  if (!texto) return 0;

  // remove tudo que não for dígito, vírgula, ponto ou sinal de menos
  // (ex: tira o prefixo "R$ " e espaços)
  let limpo = texto.replace(/[^\d,.-]/g, '');
  if (!limpo) return 0;

  if (limpo.includes(',')) {
    // formato BR: ponto = separador de milhar, vírgula = decimal
    // "1.234,56" -> "1234.56"
    limpo = limpo.replace(/\./g, '').replace(',', '.');
  }

  const numero = parseFloat(limpo);
  return isNaN(numero) ? 0 : numero;
}
