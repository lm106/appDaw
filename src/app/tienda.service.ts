import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { tienda } from './tienda';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class TiendaService {

  private categoriasUrl = 'api/productlist';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getProductos(): Observable<tienda[]> {
    return this.http.get<tienda[]>(this.categoriasUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<tienda[]>('getHeroes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<tienda> {
    const url = `${this.categoriasUrl}/?id=${id}`;
    return this.http.get<tienda[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} product id=${id}`);
        }),
        catchError(this.handleError<tienda>(`getProduct id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getProduct(id: number): Observable<tienda> {
    const url = `${this.categoriasUrl}/${id}`;
    return this.http.get<tienda>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<tienda>(`getProduct id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<tienda[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<tienda[]>(`${this.categoriasUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<tienda[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addProduct(product: tienda): Observable<tienda> {
    return this.http.post<tienda>(this.categoriasUrl, product, this.httpOptions).pipe(
      tap((newProduct: tienda) => this.log(`added Product w/ id=${newProduct.id}`)),
      catchError(this.handleError<tienda>('addProduct'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteProduct(id: number): Observable<tienda> {
    const url = `${this.categoriasUrl}/${id}`;

    return this.http.delete<tienda>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<tienda>('deleteProduct'))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(product: tienda): Observable<any> {
    return this.http.put(this.categoriasUrl, product, this.httpOptions).pipe(
      tap(_ => this.log(`updated Product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}