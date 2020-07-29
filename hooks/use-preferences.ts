import {useRecoilValue, useSetRecoilState} from 'recoil';

import {unit, language, updateUnit, updateLanguage} from '../lib/recoil-atoms';

export const usePreferences = () => ({
	unit: useRecoilValue(unit),
	language: useRecoilValue(language),
	updateUnit: useSetRecoilState(updateUnit),
	updateLanguage: useSetRecoilState(updateLanguage)
});
