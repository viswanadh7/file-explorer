import { FileType } from "@/types/file.type";
import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Pdf from "react-native-pdf";
import { SafeAreaView } from "react-native-safe-area-context";

type TFilePreview = {
  selectedFile: FileType | null;
  onClose: VoidFunction;
};

const FilePreview = ({ selectedFile, onClose }: TFilePreview) => {
  return (
    <Modal
      visible={selectedFile !== null}
      animationType="slide"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle} numberOfLines={1}>
            {selectedFile?.name}
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
        {selectedFile && (
          <Pdf
            source={{ uri: `file://${selectedFile.path}` }}
            style={styles.pdf}
            onLoadComplete={(numberOfPages) => {
              console.log(`PDF loaded: ${numberOfPages} pages`);
            }}
            onError={(error) => {
              console.log("PDF Error:", error);
              Alert.alert("Error", "Could not load PDF file");
            }}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#e74c3c",
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginRight: 10,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  pdf: {
    flex: 1,
  },
});

export default FilePreview;
