function markerSize(feature) {
    return Math.sqrt(Math.abs(feature.properties.mag)) * 5;
  }
  
  var colors = ["#7FFF00", "#dfedbe", "#eede9f", "#FF8C00", "	#FA8072", "#FF0000"]
  function fillColor(feature) {
    var mag = feature.properties.mag;
    if (mag <= 1) {
      return colors[0]
    }
    else if (mag <= 2) {
      return colors[1]
    }
    else if (mag <= 3) {
      return colors[2]
    }
    else if (mag <= 4) {
      return colors[3]
    }
    else if (mag <= 5) {
      return colors[4]
    }
    else {
      return colors[5]
    }
  }
  
  var attribution = "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\"></a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>";
  
  var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 4,
    id: "mapbox.satellite",
    accessToken: API_KEY
  });
  
  var darkMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 4,
    id: "mapbox.dark",
    accessToken: API_KEY
  });
  
  var outdoorsMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: attribution,
    maxZoom: 4,
    id: "mapbox.outdoors",
    accessToken: API_KEY
  });
  
  var baseMaps = {
    "Satellite": satelliteMap,
    "Dark": darkMap,
    "Outdoors": outdoorsMap
  };
  
  var queryUrl = "Data.json";
  
  var distillityPath = "Data.json";
  
  d3.json(queryUrl, function(data) {
      d3.json(distillityPath, function(distilliryData) {
    
        console.log(distilliryData);
  
      var name = L.geoJSON(data, {
  
          pointToLayer: function (feature, latlng) {
            var geojsonMarkerOptions = {
              radius: 8,
              stroke: false,
              //fillColor: "#ff7800",
              radius: markerSize(feature),
              fillColor: fillColor(feature),
              //color: "white",
              weight: 5,
              opacity: .8,
              fillOpacity: .8
            };
            return L.circleMarker(latlng, geojsonMarkerOptions);
          },
    
          onEachFeature: function (feature, layer) {
            return layer.bindPopup(`<strong>Place:</strong> ${feature.properties.place}<br><strong>Magnitude:</strong> ${feature.properties.mag}`);
          }
        });
  
      var distilliryStyle = {
          "color": "white",
          "weight": 2,
          "opacity": 1,
          fillOpacity: 0,
        };
        var distilliry = L.geoJSON(distilliryData, {
          style: distilliryStyle
        });
    
        var overlayMaps = {
           "Distillery": name,
        };
    
        var map = L.map("map", {
          center: [40.7829, -73.9654],
          zoom: 4,
          layers: [satelliteMap, name]
        });
    
        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
        }).addTo(map);
   
      })
    })