module.exports = {
	'env': {
		'browser': true,
		'commonjs': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest'
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		'no-var': 0,
		'no-trailing-spaces': 'error',  // 禁止行尾空格
    'no-multiple-empty-lines': [2, { 'max': 1 }],   // 最大空行1行
		'@typescript-eslint/no-var-requires': 0,
		'quotes': ['error', 'single'],
		'semi': ['error', 'always']
	}
};
