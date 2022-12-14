import { JSONDatabase } from "./database";

const zeroPad = (num: number | string, places: number) =>
  String(num).padStart(places, "0");

// aggregate candidat
export const writeEntryToDay = async (
  database: JSONDatabase,
  id: string,
  date: string,
  description: string,
  time: string,
  isDayOff: boolean,
) => {
  const [year, month, day] = date.split("-");
  const saveToDayPath = `/years/${year}/${month}/${parseInt(day)}`;
  const entryPath = `/entrys/${id}`;
  const [hh, mm] = time.split(":");
  time = `${zeroPad(hh, 2)}:${zeroPad(mm, 2)}`;

  await database.updateData(saveToDayPath, { isDayOff: isDayOff });
  await database.updateData(saveToDayPath + entryPath, { description, time });
};

export const deleteEntry = async (
  database: JSONDatabase,
  date: string,
  id: string,
) => {
  const [year, month, day] = date.split("-");
  const dayPath = `/years/${year}/${month}/${parseInt(day)}`;
  const entryPath = `${dayPath}/entrys/${id}`;
  console.log(`Entry path: ${entryPath}`);
  await database.delete(entryPath);
};

// TODO where call it? Custom command?
export const initializeNewMonth = async (
  database: JSONDatabase,
  year: number,
  month: number,
) => {
  for (let i = 0; i < new Date(year, month, 0).getDate(); i++) {
    // @ts-ignore
    const saveToDayPath = `/years/${year}/${month}/${parseInt(i)}`;
    await database.saveData(saveToDayPath, { description: "", time: "00:00" });
  }
};
