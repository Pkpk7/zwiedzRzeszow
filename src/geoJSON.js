var markeryZjedz = {
    geojson: {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [22.006207, 50.036881]
            },
            properties: {
                title: 'Piwa Świata',
                description: 'Sklep z piwami kraftowymi.'
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [22.003789, 50.038130]
            },
            properties: {
                title: 'KukNuk',
                description: 'Kuchnia nowoczesna.'
            }
        }, {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [21.999612, 50.038412]
            },
            properties: {
                title: 'Osteria Bellannuna',
                description: 'Kuchnia włoska.'
            }
        }, {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [22.002863, 50.039861]
            },
            properties: {
                title: 'Dara kebab',
                description: 'Kebab 😀'
            }
        }, {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [22.017859, 50.029875]
            },
            properties: {
                title: 'PizzaEPasta',
                description: 'Pizza i makaron'
            }
        }]
    }
}; var markeryZobacz = {
    geojson: {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [22.014375, 50.030625]
            },
            properties: {
                title: 'Uniwersytet Rzeszowski',
                description: 'Główny budynek kolegium przyrodniczego URZ.'
            }
        }, {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [21.999444, 50.040985]
            },
            properties: {
                title: 'Pomnik czynu rewolucyjnego',
                description: 'Najbardziej znany pomnik w Rzeszowie.'
            }
        }, {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [21.996178, 50.022300]
            },
            properties: {
                title: 'Stadion stal',
                description: 'Stadion Miejski Stal w Rzeszowie.'
            }
        }, {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [22.000248, 50.032607]
            },
            properties: {
                title: 'Zamek Lubomirskich',
                description: 'Jeden z głównych zabytków w Rzeszowie wybudowany w latach 1902-1906.'
            }
        }, {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [50.042461, 21.998271]
            },
            properties: {
                title: 'Galeria Rzeszów',
                description: 'Największy centrum handlowe w woj. podkarpackim.'
            }
        }]
    }
}; var markeryBar = {
    geojson: {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [22.005686, 50.037118]
            },
            properties: {
                title: 'Corner pub Rzeszów',
                description: 'Pub z pegazusem i dobrym piwem.'
            }
        }, {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [22.003853, 50.038123]
            },
            properties: {
                title: 'Cybermachina',
                description: 'Konsole, planszówki, cosplay i alkohol.'
            }
        }, {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [22.001335, 50.036220]
            },
            properties: {
                title: 'Hokuspokus',
                description: 'Włoska, amerykańska i meksykańska kuchnia.'
            }
        }, {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [22.003245, 50.036338]
            },
            properties: {
                title: 'Manufkatura',
                description: 'Największy w Polsce browar restauracyjny'
            }
        }
        ]
    }
}

var layerToAdd = ["22.006207,50.036881;22.003789,50.038130;21.999612,50.038412;22.002863,50.039861;22.017859,50.029875;22.006207,50.036881",
                  "22.014375,50.030625;21.999444,50.040985;21.996178,50.022300;22.000248,50.032607;21.998271,50.042461;22.014375,50.030625",
                 "22.005686,50.037118;22.003853,50.038123;22.001335,50.036220;22.003245,50.036338;22.005686,50.037118"];

module.exports = {markeryBar, markeryZjedz, markeryZobacz, layerToAdd};

/*LatLng piwaSwiata = new LatLng(50.036881, 22.006207);
LatLng kukNuk = new LatLng(50.038130, 22.003789);
LatLng osteriaBellannuna = new LatLng(50.038412, 21.999612);
LatLng daraKebab = new LatLng(50.039861, 22.002863);
LatLng PizzaEPasta = new LatLng(50.029875, 22.017859);

LatLng uniwersytetRzeszowski = new LatLng(50.030625, 22.014375);
LatLng pomnikCzynuRewolucyjnego = new LatLng(50.040985, 21.999444);
LatLng stadionStal = new LatLng(50.022300, 21.996178);
LatLng zamekLubomirskich = new LatLng(50.032607, 22.000248);
LatLng galeriaRzeszow = new LatLng(50.042461, 21.998271);

LatLng cornerPubRzeszow = new LatLng(50.037118, 22.005686);
LatLng cybermachina = new LatLng(50.038123, 22.003853);
LatLng hokusPokus = new LatLng(50.036220, 22.001335);
LatLng manufaktura = new LatLng(50.036338, 22.003245);*/