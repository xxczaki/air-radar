# Air Radar ☁️

> Quickly check air quality in your area using trusted sources!

[![Build Status](https://travis-ci.org/xxczaki/air-radar.svg?branch=master)](https://travis-ci.org/xxczaki/air-radar)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

---

## Highlights

WIP

## Development

The following environmental variables need to be provided:

* `DB_URI` - MongoDB database URI.
* `DB_USER` - Database username.
* `DB_PASSWORD` - Database password.
* `DB_NAME` - Database name.
* `DB_COLLECTION` - Collection name.
* `NEXT_PUBLIC_AIRLY_KEY` - [Airly API](https://developer.airly.eu/) key.
* `NEXT_PUBLIC_WAQI_KEY` - [Air Quality Open Data Platform API](https://aqicn.org/api/) token.
* `NEXT_PUBLIC_MAPBOX_TOKEN` - [Mapbox](https://www.mapbox.com/) API token.

You can use the [`.env.local`](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables) file for this.

---

> Hosted with [Vercel ▲](https://vercel.com)

```bash
# Run in development mode
$ npm run dev

# Build for production
$ npm run build

# Lint
$ npm test
```

## TODO

- [x] Home page
	- [ ] Multiple data sources
		- [x] Airly
		- [x] World Air Quality Index
		- [ ] ?
	- [ ] Show the amount of reports created
- [ ] Reports page
    - [x] Map
	- [ ] Charts
	- [x] Sensor information
		- [x] Provider
		- [x] Location
		- [x] Distance
	- [ ] Share functionality
    	- [ ] Generate Open Graph images
	- [x] Information about WHO standards
- [ ] i18n **WIP**

### License

MIT
