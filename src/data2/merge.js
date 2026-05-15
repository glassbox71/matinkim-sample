import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// JSON 파일들이 있는 폴더
const dataDir = __dirname;

let allData = [];

// 파일 읽기
const files = fs.readdirSync(dataDir);

for (const file of files) {
  if (file.endsWith(".json") && file !== "all.json") {
    const filePath = path.join(dataDir, file);

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    if (Array.isArray(jsonData)) {
      // 👉 category 자동 추가 (선택)
      const category = file.replace(".json", "");

      const mapped = jsonData.map((item) => ({
        ...item,
        category,
      }));

      allData.push(...mapped);
    } else {
      console.warn(`${file} 은 배열이 아닙니다.`);
    }
  }
}

// 👉 중복 제거 (id 기준)
const uniqueData = Array.from(
  new Map(allData.map((item) => [item.id, item])).values()
);

// 결과 저장
fs.writeFileSync(
  path.join(dataDir, "all.json"),
  JSON.stringify(uniqueData, null, 2),
  "utf-8"
);

console.log("all.json 생성 완료!");