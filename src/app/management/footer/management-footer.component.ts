// Copyright (c) 2020 Benjamin La Madrid
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Component } from '@angular/core';

@Component({
  selector: 'app-management-footer',
  templateUrl: './management-footer.component.html',
  styleUrls: ['./management-footer.component.css']
})
export class ManagementFooterComponent {

  public footerText = 'Todos los derechos reservados.';

  constructor() { }

}
