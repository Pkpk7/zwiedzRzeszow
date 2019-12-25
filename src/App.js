import React, { Component } from 'react';
import logo from './logo.svg';
import mapboxgl from 'mapbox-gl';
import './App.css';
import { markeryZobacz, markeryZjedz, markeryBar, layerToAdd } from './geoJSON';


mapboxgl.accessToken = 'pk.eyJ1IjoicGtwazciLCJhIjoiY2s0MGExaTdhMDB3YTNkbnlsc2dxbmFlZSJ9.SyulIR86ATGSgywlKKMnkA';

class App extends Component {
  constructor(props) {
    super(props);
    this.dissapear = this.dissapear.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.dissapearNearPlaces = this.dissapearNearPlaces.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);


    this.state = {
      lng: 21.991193,
      lat: 50.041520,
      zoom: 12,
      showOutsideOfRzeszowDiv: false,
      travelTime: 0,
      showTravelTimeDiv: false,
      position: { lng: 0, lat: 0 },
      coordinatesOfTheMarkerToDraw: undefined,
      cacheMarker: undefined,
      showTheNearPlaces: false,
      nearPlacesString: "",
      firstRoute: { show: false, number: 0 },
      secondRoute: { show: false, number: 1 },
      thirdRoute: { show: false, number: 2 }
    };



  }

  componentDidMount() {

    //Bounds of the map - can't scroll outside of them
    var bounds = [
      [21.857297, 49.928937], // Southwest coordinates
      [22.101056, 50.081192] // Northeast coordinates
    ];

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      maxBounds: bounds
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    let setTime = (dane) => { this.setState({ travelTime: dane }); };
    let setShowTravelTimeToTrue = () => { this.setState({ showTravelTimeDiv: true }) };

    var geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })

    map.addControl(geolocate);


    let pozycja = { latitude: 0, longitude: 0 };
    var firstUse = true;
    var coordinates;
    var lineOfMovement = { coordinates: coordinates, type: "LineString" };
    //console.log(geolocate.getSource);

    var allmarkers = markeryBar.geojson.features.concat(markeryZjedz.geojson.features, markeryZobacz.geojson.features);
    for (let z of allmarkers) {
      console.log(z.geometry.coordinates[0]);
    }

    // If the user is out of the bounds of Rzeszów, show him the message that
    // some of the functionalities might not work for him. 
    geolocate.on('outofmaxbounds', () => { this.setState({ showOutsideOfRzeszowDiv: true }); });

    let stringPobliskie = "";


    //on every geolocate tick
    geolocate.on('geolocate', (position) => {



      pozycja.latitude = position.coords.latitude; pozycja.longitude = position.coords.longitude;
      //0.00008 - how large the change of location must be, to draw it on the map
      console.log("wykonuje sie czesto");
      console.log(this.state.position.lat + " " + this.state.position.lng);
      console.log(pozycja.latitude + " " + pozycja.longitude);


      if (!(typeof this.state.coordinatesOfTheMarkerToDraw === 'undefined') && document.getElementsByTagName("button")[0].className !== 'mapboxgl-ctrl-geolocate') {
        drawRouteFromUserToASpecifiedMarker();
      }

      this.setState({ nearPlacesString: "" });

      //Show the popup when the object is near 
      allmarkers.forEach((marker) => {

        if (Math.abs(pozycja.latitude - marker.geometry.coordinates[1]) < 0.00060 && Math.abs(pozycja.longitude - marker.geometry.coordinates[0]) < 0.00060) {

          console.log("popop");
          this.setState({ nearPlacesString: this.state.nearPlacesString + "'" + marker.properties.title + "' " });

        }

      })

      if (this.state.nearPlacesString !== stringPobliskie) {

        this.setState({ showTheNearPlaces: true });
      }
      stringPobliskie = this.state.nearPlacesString;



      // Draw the route taken by the object only if the object changed its position more than 0.00008
      if (Math.abs(this.state.position.lat - pozycja.latitude) > 0.00008 || Math.abs(this.state.position.lng - pozycja.longitude) > 0.00008) {
        //Rysuj sciezke przebyta przez obiekt
        console.log("WENWA");

        if (firstUse) {
          coordinates = [
            [pozycja.longitude, pozycja.latitude]
          ];
          lineOfMovement.coordinates = coordinates;
          firstUse = false;
          addALineToTheMap('routeUser', lineOfMovement);
          this.setState({ position: { lng: pozycja.longitude, lat: pozycja.latitude } });
        } else {

          coordinates.push([pozycja.longitude, pozycja.latitude]);
          lineOfMovement.coordinates = coordinates;
          map.getSource('routeUser').setData(lineOfMovement);
          this.setState({ position: { lng: pozycja.longitude, lat: pozycja.latitude } });
        }


        this.setState({ pozycja: { lng: pozycja.longitude, lat: pozycja.latitude } });
      }
    });



    addMarkersToMap(markeryZjedz, 'markerZjedz');
    addMarkersToMap(markeryZobacz, 'markerZobacz');
    addMarkersToMap(markeryBar, 'markerBar');






    // show chosen routes
    map.on('load', () => {

      addPremadeRoutes();

      setInterval(() => {
        let routes = [this.state.firstRoute, this.state.secondRoute, this.state.thirdRoute];
        for (let route of routes) {
          if (map.getLayer('route' + route.number)) {
            if (route.show)
              map.setLayoutProperty("route" + route.number, 'visibility', 'visible');
            else
              map.setLayoutProperty("route" + route.number, 'visibility', 'none');

            //console.log(route.show + "   " + route.number);
          }
        }

        if (document.getElementsByTagName("button")[0].className == 'mapboxgl-ctrl-geolocate') {
          if (map.getLayer('droga'))
            map.setLayoutProperty("droga", 'visibility', 'none');
            
            this.setState({showTravelTimeDiv:false});
          
        } else {
          if (map.getLayer('droga')){
            map.setLayoutProperty("droga", 'visibility', 'visible');

            this.setState({showTravelTimeDiv:true});
          }
        }


      }, 100)

    })




    //// FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE ////
    var once = true;
    let drawRouteFromUserToASpecifiedMarker = () => {

      let url = 'https://api.mapbox.com/directions/v5/mapbox/driving-traffic/' + this.state.coordinatesOfTheMarkerToDraw[0] + "," + this.state.coordinatesOfTheMarkerToDraw[1] + ";" + pozycja.longitude + "," + pozycja.latitude + '?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
      console.log(this.state.coordinatesOfTheMarkerToDraw[0] + "," + this.state.coordinatesOfTheMarkerToDraw[1] + ";" + pozycja.longitude + "," + pozycja.latitude + "AAAAAAAAAAAAAAAAAAAAAAAAA");
      let req = new XMLHttpRequest();
      req.responseType = 'json';
      req.open('GET', url, true);
      req.onload = function () {
        let jsonResponse = req.response;
        setTime(req.response.routes[0].duration);
        setShowTravelTimeToTrue();
        let coords = jsonResponse.routes[0].geometry;
        console.log(coords);
        // add the route to the map
        addRoute(coords);
      };
      req.send();

      function addRoute(coords) {
        if (once)
          addRouteToTheMap("droga", coords, '#3b9ddd', 0.8);
        once = false;
        map.getSource('droga').setData(coords);
      }
    }

    /**
     * Adds premade routes from geoJSON.js file to the map. 
     */
    function addPremadeRoutes() {
      layerToAdd.forEach((tablica, index) => {
        var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + tablica + '?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
        var req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', url, true);
        req.onload = function () {
          var jsonResponse = req.response;
          var coords = jsonResponse.routes[0].geometry;
          console.log(coords);
          // add the route to the map
          addRoute(coords);
        };
        req.send();
        function addRoute(coords) {
          // check if the route is already loaded
          let color = "";
          if (index === 0) color = '#e68580';
          if (index === 1) color = '#329999';
          if (index === 2) color = '#db9000';
          addRouteToTheMap("route" + index, coords, color, 0.8);
          map.setLayoutProperty("route" + index, 'visibility', 'none');
        };
      })
    }

    /**
     * Add a route with given parameters to the map.
     * @param {string} index - id of the route to be added 
     * @param {*} coords - coords of the route (taken from the mapbox API)
     * @param {string} color - color of the route to be added 
     * @param {number} opacity - opacity of the route to be added (from 0 to 1) 
     */
    function addRouteToTheMap(index, coords, color, opacity) {
      map.addLayer({
        "id": index,
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": coords
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": color,
          "line-width": 8,
          "line-opacity": opacity
        }
      });
    }

    /**
     * Add a line to the map. If there are more than 2 coordinates, the line-join
     * will be round.
     * @param {string} id - id of the line to be added 
     * @param {*} coordinates - coordinates of the line to be drawn
     */
    function addALineToTheMap(id, coordinates) {
      map.addLayer({
        'id': id,
        'type': 'line',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': coordinates
          }
        },
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#888',
          'line-width': 8,
          'line-opacity': 0.8
        }
      });

    }


    let onClickMarker = (marker) => {
     
        if (document.getElementsByTagName("button")[0].className !== 'mapboxgl-ctrl-geolocate') {
          this.setState({ coordinatesOfTheMarkerToDraw: marker.geometry.coordinates });
          drawRouteFromUserToASpecifiedMarker();
        
      }
    };

    /**
     * Adds the markers from the given list to the map. 
     * @param markersToAdd  a list of markers that will be added to the map 
     */
    function addMarkersToMap(markersToAdd, iconClass) {

      markersToAdd.geojson.features.forEach(function (marker) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = iconClass;

        el.onclick = () => { onClickMarker(marker) };

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
          .addTo(map);
      })
    }

  }


  dissapear() {
    this.setState({ appear: true });
    var el = document.getElementById('miejsce');
    el.remove();
  }

  dissapearNearPlaces() {
    this.setState({ showTheNearPlaces: false });
  }

  buttonPressed(whichButton) {

    if (whichButton === 0) {
      if (this.state.firstRoute.show == false) {
        this.setState({ firstRoute: { show: true, number: 0 } });
        document.getElementById("buttonZjedz").className = "zjedzPrzyciskPressed";
      }
      else {
        this.setState({ firstRoute: { show: false, number: 0 } });
        document.getElementById("buttonZjedz").className = "zjedzPrzycisk";
      }
    }
    if (whichButton === 1) {
      if (this.state.secondRoute.show == false) {
        this.setState({ secondRoute: { show: true, number: 1 } });
        document.getElementById("buttonZobacz").className = "zobaczPrzyciskPressed";
      }
      else {
        this.setState({ secondRoute: { show: false, number: 1 } });
        document.getElementById("buttonZobacz").className = "zobaczPrzycisk";
      }
    }
    if (whichButton === 2) {
      if (this.state.thirdRoute.show == false) {
        this.setState({ thirdRoute: { show: true, number: 2 } });
        document.getElementById("buttonBar").className = "barPrzyciskPressed";
      }
      else {
        this.setState({ thirdRoute: { show: false, number: 2 } });
        document.getElementById("buttonBar").className = "barPrzycisk";
      }
    }
  }

  render() {

    return (
      <div>
        {this.state.showTravelTimeDiv ?
          <div className='info-box' >
            <p>Podróż zajmie {Math.round((this.state.travelTime / 60) * 100) / 100} minut</p>
          </div> : <div></div>}
        {this.state.showOutsideOfRzeszowDiv ?
          <div id="miejsce" className='sidebarStyle' onClick={this.dissapear}>
            <div>Jesteś poza Rzeszowem, niektóre funkcjonalności mogą nie działać!</div>
          </div> : <div></div>}
        {this.state.showTheNearPlaces && this.state.nearPlacesString !== "" ?
          <div onClick={this.dissapearNearPlaces} className='near-places'>Jesteś w pobliżu {this.state.nearPlacesString}</div> : <div></div>}
        <div ref={el => this.mapContainer = el} className='mapContainer' />
        <div id='buttonBar' className='barPrzycisk' onClick={() => this.buttonPressed(2)}></div>
        <div id='buttonZobacz' className='zobaczPrzycisk' onClick={() => this.buttonPressed(1)}></div>
        <div id='buttonZjedz' className='zjedzPrzycisk' onClick={() => this.buttonPressed(0)}></div>
      </div>
    )

  }
}

export default App;
