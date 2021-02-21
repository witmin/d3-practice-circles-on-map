# Choropleth Map with D3
The video tutorial on FreeCodeCamp.org made by Curran Kelleher: https://www.youtube.com/watch?v=_8V5o2UHG0E&list=WL&index=1&t=39243s

This repository used [rollup.js](https://rollupjs.org/) as the JavaScript module bundler. 


### Population Data source
https://population.un.org/wpp/Download/Standard/Population/

# Interactive Choropleth Map source code
https://vizhub.com/curran/5c907e49d0294538aad03ad1f41e1e28?edit=files&file=index.js&mode=mini

### Issue
The legend contains an emp`ty item which caused by to a 'undefined' colorScale domain data type which shouldn't be there. 

## View the outcome
Open `public/index.html` in modern browser such as Chrome or Firefox directly. 

## Further development
To further develop the project by updating JavaScript, can run

```javascript

npm run bulid

```

or **watch** changes and auto compile:
```javascript
npm run watch
```