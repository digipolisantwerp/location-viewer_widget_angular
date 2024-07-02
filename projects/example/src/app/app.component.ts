import { Component, OnInit, ViewChild } from '@angular/core';
import {
    FilterLayerOptions,
    GeofeatureDetail,
    NgxLocationViewerComponent,
    OperationalLayerOptions,
    OperationalMarker,
    SupportingLayerOptions,
} from 'projects/ngx-location-viewer/src/public-api';

import taken from './../assets/sluiksort-taken.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    @ViewChild('locationViewer', { static: true }) locationViewer: NgxLocationViewerComponent;

    currentPosition: Array<number> = null;
    locating = false;
    result: GeofeatureDetail[];
    geoApiBaseUrl = 'https://geoapi-app1-o.antwerpen.be/v2/';
    showLayerManagement = true;
    vectorBased = false

    supportingLayerOptions: SupportingLayerOptions = {
        url: 'https://geodata.antwerpen.be/arcgissql/rest/services/P_ToK/P_Tok_routeweek/Mapserver',
        layerIds: [143, 144, 145, 146, 147],
    };

    vectorTileLayer = {
      layer: {
        name: "Basemap_antwerpen_met_labels_20220218",
        url: "https://tiles.arcgis.com/tiles/1KSVSmnHT2Lw9ea6/arcgis/rest/services/basemap_antwerpen_met_labels_20220218/VectorTileServer",
      } ,
      buttonLabel: "Basemap Antwerpen (Vector, Custom)"
    };

    normalTileLayer = {
      layer: {
        name: "Luchtfoto_actueel_wgs84",
        url: "https://geodata.antwerpen.be/arcgissql/rest/services/P_Publiek/Luchtfoto_actueel_wgs84/MapServer/tile/{z}/{y}/{x}",
      } ,
      buttonLabel: "Luchtfoto Antwerpen (Tile, Custom)"
    };

    operationalLayerOptions: OperationalLayerOptions = {
        name: 'taken',
        isVisible: true,
        markers: taken._embedded.tasks
            .filter((x) => x.locationDuringAssignment.xCoordinate !== null && x.locationDuringAssignment.xCoordinate !== '')
            .map((x) => {
                const marker: OperationalMarker = {
                    data: x,
                    icon: x.icon,
                    coordinate: {
                        lat: +x.locationDuringAssignment.xCoordinate,
                        lon: +x.locationDuringAssignment.yCoordinate,
                    },
                    color: '#000000',
                    size: '20px',
                };
                return marker;
            }),
        enableClustering: true,
    };

    filterLayers: FilterLayerOptions[] = [
        {
            url: 'https://geodata.antwerpen.be/arcgissql/rest/services/P_ToK/P_Tok_routeweek/Mapserver',
            layerId: 78,
            name: 'Routes',
            popupLabel: 'Routenaam',
            propertyToDisplay: 'Routenaam',
        },
        {
            url: 'https://geoint.antwerpen.be/arcgissql/rest/services/P_Stad/grenzen/MapServer',
            layerId: 4,
        },
    ];

    // supportingLayerOptions: SupportingLayerOptions = {
    //   url: 'https://geoint.antwerpen.be/arcgissql/rest/services/P_Stad/Mobiliteit/Mapserver',
    //   layerIds: [38, 42, 65]
    // };

    ngOnInit() {}

    updateResult(result: GeofeatureDetail[]) {
        this.result = result;
    }

    changeOverlaySettings() {
        this.supportingLayerOptions = {
            url: 'https://geodata.antwerpen.be/arcgissql/rest/services/P_ToK/P_Tok_routeweek/Mapserver',
            layerIds: [143, 144, 147],
        };

        this.operationalLayerOptions = {
            url: 'https://geoint.antwerpen.be/arcgissql/rest/services/P_Stad/Mobiliteit/Mapserver',
            layerId: 2,
            enableClustering: false,
        };
    }

    changeSettingsToVectorBased() {
        this.vectorBased = !this.vectorBased
    }

    onClickOperationalMarker(event: any): void {
        console.log(event);
    }

    onWhatIsHereSelected(event: any): void {
        console.log(event);
    }

    handler(): void {
        this.locating = true;
        this.locationViewer.leafletMap.map.once('locationfound', (e: any) => {
            const { lat, lng } = e.latlng;
            this.currentPosition = [lat, lng];
            this.locating = false;
        });
        this.locationViewer.leafletMap.map.locate();
    }
}
