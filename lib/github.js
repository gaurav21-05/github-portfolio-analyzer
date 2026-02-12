import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function getByUsername(username) {
  try {
    const { data } = await octokit.rest.users.getByUsername({
      username,
    });
    return data;
  } catch (error) {
    console.error(`Error fetching user ${username}:`, error);
    return null;
  }
}

export async function listForUser(username) {
  try {
    const { data } = await octokit.rest.repos.listForUser({
      username,
      per_page: 100,
      sort: "updated",
      direction: "desc",
      type: "all",
    });
    return data;
  } catch (error) {
    console.error(`Error fetching repos for ${username}:`, error);
    return [];
  }
}

export async function getReadme(owner, repo) {
  try {
    const { data } = await octokit.rest.repos.getReadme({
      owner,
      repo,
    });
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch (error) {
    // 404 is common if no README exists
    return null;
  }
}

export async function listCommits(owner, repo) {
  try {
    const { data } = await octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 100,
    });
    return data;
  } catch (error) {
    // Repository might be empty
    return [];
  }
}

export async function listPublicEventsForUser(username) {
  try {
    const { data } = await octokit.rest.activity.listPublicEventsForUser({
      username,
      per_page: 100,
    });
    return data;
  } catch (error) {
    console.error(`Error fetching events for ${username}:`, error);
    return [];
  }
}
