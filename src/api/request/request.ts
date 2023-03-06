import metaQuery from "./querys/projects.meta.txt";
import infoQuery from "./querys/projects.txt";

import { IProjectMetaRequestResponse, IProjectRequestResponse } from "./requestResponses";

/**
 * @description
 * get NTL Projects metadata.
 *
 * @returns {Promise<number>} - number of projects.
 */
async function getProjectsMeta() {
  try {
    const headers = new Headers();
    headers.append("content-type", "text/plain");
    const req = fetch("https://api.novel.tl/api/site/v2/graphql", {
      method: "POST",
      body: JSON.stringify({
        operationName: "Projects",
        variables: { sectionId: 1 },
        query: metaQuery,
      }),
      headers,
    });

    return req.then(async (res) => {
      const body: IProjectMetaRequestResponse = await res.json();
      const data = body.data;

      return data.projects.totalElements;
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * @description
 * get NTL Projects data.
 *
 * @returns {Promise<Object>} - projects data.
 */
export default async function getProjects() {
  try {
    const pageSize: number | undefined = await getProjectsMeta();

    if (!pageSize) throw new Error("NO AMOUNT OF PROJECTS");

    const headers = new Headers();
    headers.append("content-type", "text/plain");
    const req = fetch("https://api.novel.tl/api/site/v2/graphql", {
      method: "POST",
      body: JSON.stringify({
        operationName: "Projects",
        variables: { pageSize },
        query: infoQuery,
      }),
      headers,
    });

    return req.then(async (res) => {
      const body: IProjectRequestResponse = await res.json();
      const data = body.data;

      return data.projects;
    });
  } catch (e) {
    console.error(e);
  }
}
