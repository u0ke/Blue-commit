import jsonfile from "jsonfile";
import simpleGit from "simple-git";

const path = "./data.json";
const git = simpleGit();

// 1 Jul 2025 → 30 Sep 2025 (months are 0-based: 6=July, 8=September)
const start = new Date(2025, 6, 1, 9, 0, 0);
const end   = new Date(2025, 8, 30, 18, 0, 0);

const markCommit = async (date) => {
  const stamp = date.toISOString();
  await jsonfile.writeFile(path, { date: stamp });
  await git.add([path]);
  await git.commit(stamp, { "--date": stamp });
  console.log("Committed:", stamp);
};

const makeCommits = async (n) => {
  for (let i = 0; i < n; i++) {
    const t = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const d = new Date(t);
    d.setHours(9 + Math.floor(Math.random() * 9)); // 09:00–17:59
    d.setMinutes(Math.floor(Math.random() * 60));
    await markCommit(d);
  }
  await git.push();
  console.log(`Done: pushed ${n} commits.`);
};

makeCommits(40);