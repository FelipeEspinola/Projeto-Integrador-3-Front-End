import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  // Só seta Content-Type quando há body (evita problemas no GET/DELETE)
  const temBody = req.body !== null && req.body !== undefined;

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };
  if (temBody && !req.headers.has('Content-Type')) {
    headers['Content-Type'] = 'application/json';
  }

  const token = (typeof sessionStorage !== 'undefined')
    ? sessionStorage.getItem('token')
    : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const cloned = req.clone({ setHeaders: headers });

  return next(cloned).pipe(
    catchError((err) => {
      console.error('[HTTP ERROR]', err?.status, err?.message, err?.error);
      return throwError(() => err);
    })
  );
};
