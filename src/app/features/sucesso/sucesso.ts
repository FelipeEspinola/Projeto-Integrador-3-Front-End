import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sucesso',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  templateUrl: './sucesso.html',
  styleUrls: ['./sucesso.css']
})
export class Sucesso {}