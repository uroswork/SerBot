import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-handler',
  templateUrl: './error-handler.component.html',
  styleUrls: ['./error-handler.component.scss']
})
export class ErrorHandlerComponent {
  @Input() showError: boolean;
  @Input() errorMessage: string;
}
