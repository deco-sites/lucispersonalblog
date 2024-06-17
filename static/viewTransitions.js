

const homePagePattern = new URLPattern(`/`, window.origin);
const isHomePage = (url) => {
	return homePagePattern.exec(url);
}

const blogPostPattern = new URLPattern(`/blog/:blogpost`, window.origin);
const isBlogPostPage = (url) => {
	return blogPostPattern.exec(url);
}

const extractBlogPostNameFromUrl = (url) => {
	const match = blogPostPattern.exec(url);
	return match?.pathname.groups.blogpost;
}

const setTemporaryViewTransitionNames = async (entries, vtPromise) => {
	for (const [$el, name] of entries) {
		$el.style.viewTransitionName = name;
	}

	await vtPromise;

	for (const [$el, name] of entries) {
		$el.style.viewTransitionName = '';
	}

}

// When going to a blog-post page, set `image` and `title` vt-names
// on the elements that link to that detail page
window.addEventListener('pageswap', async (e) => {

	if (e.viewTransition) {
		const currentUrl = e.activation.from?.url ? new URL(e.activation.from.url) : null;
		const targetUrl = new URL(e.activation.entry.url);

		// Going from blog-post page to homepage
		// ~> The big img and title are the ones!
		if (isBlogPostPage(currentUrl) && isHomePage(targetUrl)) {
			setTemporaryViewTransitionNames([
				[document.querySelector(`#blog-post-image`), 'image'],
                [document.querySelector(`#blog-post-title`), 'title']
			], e.viewTransition.finished);
		}

        // Going to blog-post page
		// ~> The clicked items are the ones!
        if (isBlogPostPage(targetUrl)) {
            const blogpost = extractBlogPostNameFromUrl(targetUrl);

			setTemporaryViewTransitionNames([
				[document.querySelector(`#${blogpost}`), 'image'],
                [document.querySelector(`#title-${blogpost}`), 'title']
			], e.viewTransition.finished);
        }
	}
});

// When going from a blog-post page to the homepage, set `image` and `title` vt-names
// on the list item for the profile that was viewed on the detail page.
window.addEventListener('pagereveal', async (e) => {

	if (!navigation.activation.from) return;

	if (e.viewTransition) {
		const fromUrl = new URL(navigation.activation.from.url);
		const currentUrl = new URL(navigation.activation.entry.url);

		// Went from blog-post page to homepage
		// ~> Set VT names on the relevant list item
		if (isBlogPostPage(fromUrl) && isHomePage(currentUrl)) {
			const blogpost = extractBlogPostNameFromUrl(fromUrl);

			setTemporaryViewTransitionNames([
				[document.querySelector(`#${blogpost}`), 'image'],
                [document.querySelector(`#title-${blogpost}`), 'title']
			], e.viewTransition.ready);
		}

		// Went to profile page
		// ~> Set VT names on the main title and image
		if (isBlogPostPage(currentUrl)) {
			setTemporaryViewTransitionNames([
				[document.querySelector(`#blog-post-image`), 'image'],
                [document.querySelector(`#blog-post-title`), 'title']
			], e.viewTransition.ready);
		}
	}
});
