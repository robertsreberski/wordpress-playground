
// @ts-ignore
import url_nightly from './wp-nightly.zip?url';
// @ts-ignore
import url_beta from './wp-beta.zip?url';
// @ts-ignore
import url_6_5 from './wp-6.5.zip?url';
// @ts-ignore
import url_6_4 from './wp-6.4.zip?url';
// @ts-ignore
import url_6_3 from './wp-6.3.zip?url';
// @ts-ignore
import url_6_2 from './wp-6.2.zip?url';
// @ts-ignore
import url_6_1 from './wp-6.1.zip?url';

/**
 * This file was auto generated by packages/playground/wordpress-builds/build/build.js
 * DO NOT CHANGE MANUALLY!
 * This file must statically exists in the project because of the way
 * vite resolves imports.
 */
export function getWordPressModuleDetails(wpVersion: string = "6.5"): { size: number, url: string } {
	switch (wpVersion) {
		
		case 'nightly':
			/** @ts-ignore */
			return {
				size: 5003239,
				url: url_nightly,
			};
			
		case 'beta':
			/** @ts-ignore */
			return {
				size: 4983118,
				url: url_beta,
			};
			
		case '6.5':
			/** @ts-ignore */
			return {
				size: 4992945,
				url: url_6_5,
			};
			
		case '6.4':
			/** @ts-ignore */
			return {
				size: 4879630,
				url: url_6_4,
			};
			
		case '6.3':
			/** @ts-ignore */
			return {
				size: 3701121,
				url: url_6_3,
			};
			
		case '6.2':
			/** @ts-ignore */
			return {
				size: 3606576,
				url: url_6_2,
			};
			
		case '6.1':
			/** @ts-ignore */
			return {
				size: 3533940,
				url: url_6_1,
			};
			

	}
	throw new Error('Unsupported WordPress module: ' + wpVersion);
}
