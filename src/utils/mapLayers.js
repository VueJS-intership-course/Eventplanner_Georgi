import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import Feature from 'ol/Feature';
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point.js";

export default {
    createSingleLayer: (event) => {        
        const feature = new Feature({
            geometry: new Point(fromLonLat([event.location[0], event.location[1]])),
        });
    
        const source = new VectorSource({
            features: [feature], 
        });
    
        return new VectorLayer({
            source: source, 
        });
    }
}
