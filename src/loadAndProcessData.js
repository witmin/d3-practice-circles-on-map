import {json, csv} from "d3";
import {feature} from "topojson";

export const loadAndProcessData = () =>
    Promise.all([
        csv('./un-population-estimation.csv'),
        json('./visionscarto-110m.json')
    ])
        .then(([unData, topoJSONdata]) => {
            console.log(unData);
            const rowById = unData.reduce((accumulator, d) => {
                accumulator[d['Country code']] = d;
                return accumulator;
            }, {});

            const countries = feature(topoJSONdata, topoJSONdata.objects.countries);
            countries.features.forEach(d => {
                Object.assign(d.properties, rowById[+d.id]);
            });

            return countries;
        });
