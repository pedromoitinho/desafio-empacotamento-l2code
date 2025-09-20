import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/empacotamento/healthcheck (GET)', () => {
    return request(app.getHttpServer())
      .get('/empacotamento/healthcheck')
      .set('x-api-key', 'test-api-key-123')
      .expect(200)
      .expect({ message: 'Health Check Ok' });
  });

  it('/empacotamento/healthcheck (GET) without API key', () => {
    return request(app.getHttpServer())
      .get('/empacotamento/healthcheck')
      .expect(401);
  });

  it('/empacotamento/processamento (POST)', () => {
    const payload = {
      pedidos: [
        {
          pedido_id: 6,
          produtos: [
            {
              produto_id: 'Webcam',
              dimensoes: {
                altura: 7,
                largura: 10,
                comprimento: 5,
              },
            },
            {
              produto_id: 'Microfone',
              dimensoes: {
                altura: 25,
                largura: 10,
                comprimento: 10,
              },
            },
            {
              produto_id: 'Monitor',
              dimensoes: {
                altura: 50,
                largura: 60,
                comprimento: 20,
              },
            },
            {
              produto_id: 'Notebook',
              dimensoes: {
                altura: 2,
                largura: 35,
                comprimento: 25,
              },
            },
          ],
        },
      ],
    };

    return request(app.getHttpServer())
      .post('/empacotamento/processamento')
      .set('x-api-key', 'test-api-key-123')
      .send(payload)
      .expect(201)
      .expect((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(res.body).toHaveProperty('pedidos');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(Array.isArray(res.body.pedidos)).toBe(true);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(res.body.pedidos[0]).toHaveProperty('pedido_id', 6);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(res.body.pedidos[0]).toHaveProperty('caixas');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        expect(Array.isArray(res.body.pedidos[0].caixas)).toBe(true);
        // Check if caixas have caixa_id and produtos as array of strings
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        res.body.pedidos[0].caixas.forEach((caixa: any) => {
          expect(caixa).toHaveProperty('caixa_id');
          expect(caixa).toHaveProperty('produtos');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          expect(Array.isArray(caixa.produtos)).toBe(true);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          caixa.produtos.forEach((produto: any) => {
            expect(typeof produto).toBe('string');
          });
        });
      });
  });
});
