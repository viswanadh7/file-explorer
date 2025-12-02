import { FileType } from "@/types/file.type";
import { formatFileSize } from "@/utils/formatFileSize";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type TFileCard = {
  file: FileType;
  onPress: (file: FileType) => void;
};
const FileCard = ({ file, onPress }: TFileCard) => {
  return (
    <TouchableOpacity style={styles.fileItem} onPress={() => onPress(file)}>
      <View style={styles.fileIcon}>
        <Text style={styles.fileIconText}>PDF</Text>
      </View>
      <View style={styles.fileInfo}>
        <Text style={styles.fileName} numberOfLines={2}>
          {file.name}
        </Text>
        <Text style={styles.fileSize}>{formatFileSize(file.size)}</Text>
        <Text style={styles.filePath} numberOfLines={1}>
          {file.path}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fileItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  fileIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#e74c3c",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  fileIconText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  fileInfo: {
    flex: 1,
    justifyContent: "center",
  },
  fileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  fileSize: {
    fontSize: 12,
    color: "#666",
    marginBottom: 2,
  },
  filePath: {
    fontSize: 11,
    color: "#999",
  },
});

export default FileCard;
