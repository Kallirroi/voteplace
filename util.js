
export function clone (templateEl) {
	return document.importNode(templateEl.content, true)
}