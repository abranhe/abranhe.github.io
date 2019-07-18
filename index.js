const dom = {
	select: document.querySelector.bind(document),
	slectAll: document.querySelectorAll.bind(document)
};

(async () => {
	const textColorFromBackgroundColor = (color) => {
		if (color.length < 5) {
			color += color.slice(1);
		}

		return parseInt(color.replace('#', '0x'), 16) > 0xffffff / 2 ? '#333' : '#fff';
	};

	const url = 'https://latest-repos.abranhe.now.sh/';

	const json = await (await fetch(url)).json();

	const template = dom.select('#latest-repos-template');
	const container = dom.select('#latest-repos');

	for (const repo of json.reverse()) {
		if (!repo.description) {
			continue;
		}

		const content = template.cloneNode(true).content;

		const a = content.querySelector('.latest-repos-title');
		a.href = repo.url;
		a.textContent = repo.name;

		if (repo.primaryLanguage) {
			const lang = content.querySelector('.latest-repos-language');
			lang.textContent = repo.primaryLanguage.name;
			lang.style.color = textColorFromBackgroundColor(repo.primaryLanguage.color);
			lang.style.backgroundColor = repo.primaryLanguage.color;
		}

		content.querySelector('.latest-repos-description').textContent = repo.description;

		container.appendChild(document.importNode(content, true));
	}
})();
