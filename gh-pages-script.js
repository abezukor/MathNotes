let ghpages = require('gh-pages');
let prompt = require('prompt-sync')();

const repositoryUrl = prompt("Repository URL: ");
const gitName = prompt("Name: ");
const email = prompt("Email: ");

ghpages.publish(
    'public', // path to public directory
	{
		branch: 'gh-pages',
		repo: repositoryUrl, // Update to point to your repository
		user: {
			name: gitName, // update to use your name
			email: email // Update to use your email
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);
