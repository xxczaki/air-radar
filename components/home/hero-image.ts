import styled from 'styled-components';
import {SimpleImg} from 'react-simple-img';

const HeroImage = styled(SimpleImg)`
	user-select: none;

	@media (min-width: 150px) and (max-width: 891px) {
		display: none !important;
	}
`;

export default HeroImage;
