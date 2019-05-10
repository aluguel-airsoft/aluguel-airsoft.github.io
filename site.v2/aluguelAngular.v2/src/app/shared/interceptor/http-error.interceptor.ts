import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ToastService} from '../services/toast.service';

export class HttpErrorInterceptor implements HttpInterceptor, ToastService {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let mensagem = '';
          if (error.error instanceof ErrorEvent) {
            mensagem = 'Erro: ' + error.error.message;
          } else {
            mensagem = 'Erro Código: ' + error.status + '\nMessage: ' + error.message;
            if (error.status === 401) {
              sessionStorage.removeItem('usuario');
              localStorage.removeItem('authentication');
              sessionStorage.removeItem('authentication');
              ToastService.ativarToast('Sua sessão expirou. Faça o login novamente.');
              return throwError(mensagem);
            }
          }
          ToastService.ativarToast('Erro Código ' + error.status + '. Tente novamente mais tarde.');
          return throwError(mensagem);
        })
      );
  }
}
