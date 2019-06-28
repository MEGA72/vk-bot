ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', {
        //71.978690%2C58.936348&origin=jsapi_2_1_74&z=4
            center: [58.93, 71.97],
            zoom: 4
        }, {
            searchControlProvider: 'yandex#search'
        }),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: true
        });

    // Чтобы задать опции одиночным объектам и кластерам,
    // обратимся к дочерним коллекциям ObjectManager.
    objectManager.objects.options.set('preset', 'islands#greenDotIcon');
    objectManager.clusters.options.set('preset', 'islands#greenClusterIcons');
    myMap.geoObjects.add(objectManager);

    $.ajax({
        url: "geoBd.json"
    }).done(function(data) {
        objectManager.add(data);
    });

}