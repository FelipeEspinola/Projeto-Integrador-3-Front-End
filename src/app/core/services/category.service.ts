import { Injectable } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [
    { id: 1, nome: 'Hamburgueres' },
    { id: 2, nome: 'Acompanhamentos' },
    { id: 3, nome: 'Bebidas' },
    { id: 4, nome: 'Sobremesas'}
  ];

  getAll() {
    return this.categories;
  }
}