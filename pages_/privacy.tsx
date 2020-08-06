import React from 'react';
import {NextPage} from 'next';
import useTranslation from 'next-translate/useTranslation';

import Container from '../components/container';
import Main from '../components/main';

const Index: NextPage<unknown> = () => {
	const {t} = useTranslation();

	return (
		<Container>
			<Main>
				<h1>{t('privacy:title')}</h1>
				<i>Last updated: 06/08/2020</i>
				<h3>Introduction</h3>
				<p>Air Radar was created to allow people to easily discover air quality anywhere in the world in a matter of seconds and then - if they want to - easily share this information with others.</p>
				<p>There are already many tools that enable such functionality. Some of them display colorful maps with hundreds or even thousands of sensors. Why would we want to reinvent the wheel?</p>
				<p>Well, there are some things that we do not like about the existing solutions, mainly:</p>
				<ul>
					<li>privacy implications (collecting user data, displaying annoying ads);</li>
					<li>limited coverage;</li>
					<li>limited customization options;</li>
					<li>selling proprietary, often very expensive sensors, without allowing custom-made sensors.</li>
				</ul>
				<b>Air Radar aims to solve these issues by offering a totally free and open-source platform, which does not collect any data and allows for multiple customization options.</b>
				<h3>Collected data</h3>
				<p>Since Air Radar does not offer account creation, we do not collect nor store sensitive data, such as e-mail addresses, passwords, names etc.</p>
				<p>In order to create air quality reports, user needs to provide a location. They can do it in 2 ways:</p>
				<ul>
					<li>using the Geolocation API*</li>
					<li>manually entering a desired location</li>
				</ul>
				<p>* required browser permission to be granted.</p>
				<p>If the second option is chosen, Air Radar will use a third-party service (Nominatim) to obtain the geographic coordinates from the given location. Their privacy policy can be found here.</p>
				<b>Air Radar does not use IP-based location lookup.</b>
				<p>Regardless of the way chosen, the coordinates will a part of the report, which is saved in a database. Since the report itself already contains air quality data, the coordinates are only used to show an interactive map and calculate a distance between the provided location and the air quality sensor.</p>
				<p>The connection between the site and the database is encrypted and the access credentials are strong and periodically changed for further security.</p>
				<h3>Deleting reports</h3>
				<p>Reports created by the user are saved in the browser and can be seen and managed (therefore also deleted) on the history page. In case the user clears the browser storage and still wants to delete a report, they can contact the site administrator at <i>a@kepinski.me</i> with a unique report ID, or, in case they do not have it, with other details, which can help find the report (such as, but not limited to: the time, when the report was created). The administrator will remove the report from the database within 48 hours.</p>
				<p>The database containing user-generated reports may also be periodically purged, without a notice.</p>
				<h3>Third-party services</h3>
				<p>Air Radar site is hosted on Vercel and the database we use to store air quality reports is hosted on MongoDB Atlas. We also use third-party services, including Nominatim, Mapbox, Airly and World Air Quality Index, which maintain their own privacy policy pages.</p>
				<b>We do not use any analytics, marketing or advertising services.</b>
				<h3>Cookies and browser storage</h3>
				<p>Air Radar uses cookies only for performance reasons and therefore they are not required, but highly recommended. We also use the Web Storage API for saving user preferences and generated reports (in the form of unique IDs). Disabling or clearing the browser storage may impact the functionality of the site.</p>
				<h3>Other concerns</h3>
				<p>Users can contact the site administrator at any time regarding any questions and concerns related to their privacy at <i>a@kepinski.me</i>.</p>
			</Main>
		</Container>
	);
};

export default Index;
