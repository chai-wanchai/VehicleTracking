export function pagingProcess(page) {
  return {
		limit: page.itemPerPage,
		offset: page.itemPerPage * (page.page - 1)
	};
}
