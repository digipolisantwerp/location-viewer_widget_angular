import { Component, OnInit } from '@angular/core';
import { SupportingLayerOptions } from 'projects/ngx-location-viewer/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showToolbar = true;
  showLayerManagement = false;
  hasSidebar = false;
  supportingLayerOptions: SupportingLayerOptions = {
    url: 'http://geodata.antwerpen.be/arcgissql/rest/services/P_ToK/P_Tok_routeweek/Mapserver',
    layerIds: [143, 144, 145, 146, 147]
  };

  ngOnInit() {
  }
}