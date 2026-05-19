import { TestBed } from '@angular/core/testing';
import * as cartImports from './cart';

describe('Cart', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    const CartToken = (cartImports as any).default || (cartImports as any).Cart || (cartImports as any).CartService;
    service = TestBed.inject(CartToken);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
