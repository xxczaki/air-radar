**Disclaimer: Work in progress**

---

# Air Radar ☁️

> Generate air quality reports from anywhere in the world and share them with your friends!

[![Build Status](https://travis-ci.org/xxczaki/air-radar.svg?branch=master)](https://travis-ci.org/xxczaki/air-radar)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

---

## Highlights

- Blazing fast (uses incremental SSG and many performance optimizations) ⚡
- Uses 2* data sources merged into one, unified API 📑
- Implements i18n 🌐
- Features strong focus on accessibility 👍
- Fully customizable 🛠️
- Pleasing, fully responsive design 💅
- Utilizes end-to-end encryption 🔒
- Written in TypeScript

*We aim to add more data sources in the future.

## Development

The following environmental variables need to be provided:

* `DB_URI` - MongoDB database URI.
* `DB_USER` - Database username.
* `DB_PASSWORD` - Database password.
* `DB_NAME` - Database name.
* `DB_COLLECTION` - Collection name.
* `NEXT_PUBLIC_AIRLY_KEY` - [Airly API](https://developer.airly.eu/) key.
* `NEXT_PUBLIC_WAQI_TOKEN` - [Air Quality Open Data Platform API](https://aqicn.org/api/) token.
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
	- [x] Show the amount of reports created
- [ ] Reports page
    - [x] Map
	- [ ] Charts
	- [x] Sensor information
		- [x] Provider
		- [x] Location
		- [x] Distance
	- [x] Share functionality
    	- [x] Generate Open Graph images
    	- [x] Investigate the `Navigator.share()` API
	- [x] Information about WHO standards
- [ ] Other pages
	- [ ] Allow adding custom-made air pollution sensors
	- [ ] Manage locally created reports (blocked by state persistance)
	- [x] Privacy policy
- [ ] i18n (long-standing task)
- [x] Persist global state (possibly blocked by Recoil API changes)
- [ ] Secure API routes (only the ones that need to be secured)
- [ ] Improve language-based redirection
- [x] End-to-end encryption

## Technology stack

- [**React**](https://reactjs.org/) for UI;
- [**Next.js**](https://nextjs.org/) for SSG, dynamic routes and much more;
- [**Styled Components**](https://styled-components.com/) for styling;
- [**Recoil**](https://recoiljs.org/) for state management;
- [**MongoDB**](https://www.mongodb.com/) for storing user-generated reports.

### License

MIT
