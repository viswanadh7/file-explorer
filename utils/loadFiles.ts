import { FileType } from "@/types/file.type";
import RNBlobUtil from "react-native-blob-util";

export const loadFiles = async () => {
  let allPDFs: FileType[] = [];
  try {
    const rootPath = "/storage/emulated/0";
    const scanDir = async (dirPath: string, depth = 0) => {
      if (depth > 15) return;

      try {
        const items = await RNBlobUtil.fs.lstat(dirPath);

        for (const item of items) {
          if (
            item.type === "file" &&
            item.filename.toLowerCase().endsWith(".pdf")
          ) {
            allPDFs.push({
              name: item.filename,
              path: item.path,
              size: Number(item.size),
            });
          } else if (
            item.type === "directory" &&
            !item.path.includes("Android/data") &&
            !item.path.includes("Android/obb") &&
            !item.path.includes("Android/.Trash")
          ) {
            await scanDir(item.path, depth + 1);
          }
        }
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    await scanDir(rootPath);
  } catch (error) {
    console.log("Something went wrong", error);
  }
  return allPDFs;
};
