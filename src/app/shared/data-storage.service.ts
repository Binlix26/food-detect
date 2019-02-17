import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Key d47493e0e83d42b690e6953b632bb82e'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private apiUrl = 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs';
  private lastUrl = '';
  private dataTemplate = {
    inputs: [
      {
        data: {
          image: {
            url: ''
          }
        }
      }
    ]
  };

  constructor(private http: HttpClient) {
  }

  fetchData(url: string) {
    this.dataTemplate.inputs[0].data.image.url = url;
    return this.http.post(this.apiUrl, this.dataTemplate, httpOptions).pipe(
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // TODO return error message to logging service
    return of('Please Enter a valid image URL');
  }
}
