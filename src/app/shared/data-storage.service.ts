import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { MessageService } from './message.service';

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
  private apiUrl =
    'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs';
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

  constructor(private http: HttpClient, private mesService: MessageService) {}

  fetchData(url: string) {
    this.dataTemplate.inputs[0].data.image.url = url;
    this.mesService.startFetching();
    return this.http.post(this.apiUrl, this.dataTemplate, httpOptions).pipe(
      catchError(this.handleError), // then handle the error
      finalize(() => {
        this.mesService.finishFeching();
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError({
        status: 'fail',
        details: 'Something bad happened; please try again later'
      });
    }
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    const errorBody = error.error;
    console.error(`Backend returned code ${error.status}, ` + `body was: `);
    console.log(errorBody);

    // return an observable with a user-facing error message
    return throwError({
      status: errorBody.status.description,
      detail: errorBody.outputs[0].status.details
    });
  }
}
