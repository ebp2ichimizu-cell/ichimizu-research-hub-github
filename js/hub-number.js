export function hubNumber(studyOrId) {
  const id =
    typeof studyOrId === "string"
      ? studyOrId
      : studyOrId?.id || "";

  const match =
    id.match(/^study-(\d+)$/);

  if (!match) {
    return "";
  }

  return `HUB No.${match[1].padStart(3, "0")}`;
}
