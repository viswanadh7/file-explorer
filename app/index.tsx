import FileCard from "@/components/FileCard";
import FilePreview from "@/components/FilePreview";
import { FileType } from "@/types/file.type";
import { loadFiles } from "@/utils/loadFiles";
import { requestStoragePermission } from "@/utils/requestStoragePermission";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    const response = await requestStoragePermission();
    if (response) {
      const loadedFiles = await loadFiles();
      setFiles(loadedFiles);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text style={styles.loadingText}>Loading PDF files...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>File explorer</Text>
        <Text style={styles.headerSubtitle}>
          {files.length} pdf files found
        </Text>
      </View>

      {files.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No PDF files found</Text>
          <Text style={styles.emptySubtext}>
            Add some PDF files to your device storage
          </Text>
        </View>
      ) : (
        <FlatList
          data={files}
          renderItem={({ item }) => (
            <FileCard file={item} onPress={() => setSelectedFile(item)} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <FilePreview
        selectedFile={selectedFile}
        onClose={() => setSelectedFile(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#e74c3c",
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    opacity: 0.9,
  },
  listContainer: {
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  emptyText: {
    fontSize: 18,
    color: "#999",
    fontWeight: "600",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 5,
  },
});

export default Index;
