


var map;
var overlayLayers={};
var controlLayer;


/*
{
   "backend-usrpwd": "KLEANLOGIN:b1303202-a0d6-41f6-8146-bab7f190f3de",
   "realm":"your_realm"
}
*/


var oauth_config={
 "realm": "wateragri",
 "auth-server-url": "https://localhost:8443/auth",
 "ssl-required": "none",
 "resource": "php-client",
 "public-client": true,
 "use-resource-role-mappings": true
};


function login(){
  console.log("LOGIN");
  var redirect_uri=encodeURIComponent("http://localhost:5000/");
  window.location=oauth_config['auth-server-url']+"/realms/"+oauth_config.realm+"/protocol/openid-connect/auth?response_type=code&redirect_uri="+redirect_uri+"&client_id="+oauth_config.resource;
}

function init_home(){


  jQuery("#login").click(function(){login();});

  var html="<div class='alert alert-info'>Click on the case study to access the data</div>";
  html+="<h3>Case Study sites</h3><div id='case_study_list' class=''></div>";
  jQuery("#sidebar").html(html);

   if(jQuery("#map_leaflet").height()<250){
     jQuery("#map_leaflet").height(250);
   }

    map = L.map('map_leaflet').setView([49,12], 5);
    var maxZoom=20;

    var base=L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: maxZoom,
      maxNativeZoom: 18
    }).addTo(map);;

    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      maxZoom: maxZoom,
      maxNativeZoom: 18
    });


    var baseMaps = {
      "Base": base,
      "Satellite": Esri_WorldImagery
    };
    controlLayer = L.control.layers(baseMaps).addTo(map);






   jQuery.ajax({
     "url":"/api/sites",
     "success": function(data){
       jQuery.each(data.data, function(k,v){

         var el='<div class="card"><div class="card-body"><h5 class="card-title">'+v.site_name+'</h5><p class="card-text"></p><button class="btn btn-primary">Zoom in</button></div></div>';

         jQuery(el).appendTo("#case_study_list").click(function(el){
           location.hash="#/site/"+v.schema;
           init_site(v.schema);
         });

         var marker = L.marker([v.lat,v.lon]).addTo(map);

       });
     }
   });

}


function init_site(schema){

  var html="loading...";
  jQuery("#sidebar").html(html);


  jQuery.each(overlayLayers, function(k,l){
      controlLayer.removeLayer(l);
      map.removeLayer(l);
  });
  overlayLayers={};

  jQuery.ajax({
    "url":"/api/site/"+schema,
    "success": function(data){

      var site=data.site.data[0];

      var html="<h3>"+site.site_name+"</h3><div id='layer_container'></div>";
      jQuery("#sidebar").html(html);

      map.flyTo([site.lat, site.lon], 12);

      jQuery.each(data.topic.data, function(k, t){
        var el='<div class="card"><div class="card-body"><h5 class="card-title">'+t.topic_name+'</h5><p class="card-text"></p></div></div>';
        jQuery("#layer_container").append(el);
      });

      //Wait the end of the zoom to add the layer
      setTimeout(function () {

        jQuery.each(data.topic.data, function(k, t){
          var wmsLayer = L.tileLayer.wms('http://localhost:9380/geoserver/'+schema+"/wms?service=WMS", {
              layers: schema+':'+t.topic,
              format: 'image/png',
              transparent: true,
              opacity: 0.8
          });
          wmsLayer.addTo(map);

          controlLayer.addOverlay(wmsLayer, t.topic_name+" ("+schema+")");
          overlayLayers[schema+"_"+t.topic]=wmsLayer;

        });
      }, 2000);


    }
  });


}
