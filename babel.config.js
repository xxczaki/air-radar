const presets = [
	['next/babel', {
		'preset-env': {
			targets: {
				esmodules: true
			},
			corejs: '3.6',
			useBuiltIns: 'usage'
		}
	}]
];

const plugins = [
	['babel-plugin-styled-components', {
		ssr: true,
		pure: true
	}],
	'babel-plugin-polished'
]

module.exports = {presets, plugins};
