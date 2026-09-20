
const files = {
  studies: "./data/studies-ja.json",
  programs: "./data/programs-ja.json",
  researchers: "./data/researchers-ja.json",
  reports: "./data/reports-ja.json",
  policy: "./data/site-policy-ja.json"
};

export async function loadAllData(){
  const entries = await Promise.all(
    Object.entries(files).map(async ([key,url])=>{
      const res = await fetch(url);
      if(!res.ok) throw new Error(`${url} の読み込みに失敗しました`);
      return [key, await res.json()];
    })
  );
  return Object.fromEntries(entries);
}
