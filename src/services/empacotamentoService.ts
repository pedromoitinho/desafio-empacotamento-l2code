import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OrdemDto } from 'src/dtos/ordemDto';
import { DimensoesDto } from 'src/dtos/dimensoesDto';
import { ProdutoDto } from 'src/dtos/produtoDto';

const caixasManoel = [
  {
    nome: 'Caixa 1',
    altura: 30,
    largura: 40,
    comprimento: 80,
    volume: 30 * 40 * 80,
  },
  {
    nome: 'Caixa 2',
    altura: 50,
    largura: 50,
    comprimento: 40,
    volume: 50 * 50 * 40,
  },
  {
    nome: 'Caixa 3',
    altura: 50,
    largura: 80,
    comprimento: 60,
    volume: 50 * 80 * 60,
  },
].sort((a, b) => a.volume - b.volume);

export type ProdutoComVolume = ProdutoDto & { volume: number };

export interface processamentoCaixa {
  produtos: ProdutoComVolume[];
  volumeOcupado: number;
  infoCaixa: (typeof caixasManoel)[0];
}

export interface ResultadoProcessamento {
  pedido_id: number;
  caixas: {
    caixa_id: string | null;
    produtos: string[];
    observacao?: string;
  }[];
}

@Injectable()
export class EmpacotamentoService {
  healthCheck(): { message: string } {
    try {
      return { message: 'Health Check Ok' };
    } catch (err) {
      throw new InternalServerErrorException({ message: err });
    }
  }

  processamentoCaixa(pedidos: OrdemDto[]): ResultadoProcessamento[] {
    const resultado = pedidos.map((pedido) => {
      const ordenarProdutos: ProdutoComVolume[] = pedido.produtos
        .map((p) => ({
          ...p,
          volume:
            p.dimensoes.altura * p.dimensoes.largura * p.dimensoes.comprimento,
        }))
        .sort((a, b) => b.volume - a.volume);

      const caixasUtilizadas: processamentoCaixa[] = [];
      const produtosNaoCabem: string[] = [];

      for (const produto of ordenarProdutos) {
        let isProdutoEncaixotado = false;

        for (const caixa of caixasUtilizadas) {
          if (
            this.produtoCabeNaCaixa(produto.dimensoes, caixa.infoCaixa) &&
            caixa.infoCaixa.volume - caixa.volumeOcupado >= produto.volume
          ) {
            caixa.produtos.push(produto);
            caixa.volumeOcupado += produto.volume;
            isProdutoEncaixotado = true;
            break;
          }
        }

        if (!isProdutoEncaixotado) {
          const caixaApropriada = caixasManoel.find((c) =>
            this.produtoCabeNaCaixa(produto.dimensoes, c),
          );
          if (caixaApropriada) {
            caixasUtilizadas.push({
              produtos: [produto],
              volumeOcupado: produto.volume,
              infoCaixa: caixaApropriada,
            });
          } else {
            produtosNaoCabem.push(produto.produto_id);
          }
        }
      }

      const caixas: {
        caixa_id: string | null;
        produtos: string[];
        observacao?: string;
      }[] = caixasUtilizadas.map((c) => ({
        caixa_id: c.infoCaixa.nome,
        produtos: c.produtos.map((p) => p.produto_id),
      }));

      if (produtosNaoCabem.length > 0) {
        caixas.push({
          caixa_id: null,
          produtos: produtosNaoCabem,
          observacao: 'Produto não cabe em nenhuma caixa disponível.',
        });
      }

      return {
        pedido_id: pedido.pedido_id,
        caixas,
      };
    });

    return resultado;
  }

  private produtoCabeNaCaixa(
    produto: DimensoesDto,
    caixa: (typeof caixasManoel)[0],
  ): boolean {
    const dimensoesProduto = [
      produto.altura,
      produto.largura,
      produto.comprimento,
    ].sort((a, b) => a - b);
    const dimensoesCaixa = [
      caixa.altura,
      caixa.largura,
      caixa.comprimento,
    ].sort((a, b) => a - b);
    return (
      dimensoesProduto[0] <= dimensoesCaixa[0] &&
      dimensoesProduto[1] <= dimensoesCaixa[1] &&
      dimensoesProduto[2] <= dimensoesCaixa[2]
    );
  }
}
