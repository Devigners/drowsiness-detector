import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

const Block = ({
  justifyContent,
  alignItems,
  paddingHorizontal,
  children,
  backgroundColor,
  scrollStyle,
  contentContainerStyle,
  withoutScroll,
}) => {
  const externalStyle = {
    justifyContent: justifyContent || "flex-start",
    alignItems: alignItems || "stretch",
    backgroundColor: backgroundColor,
    paddingHorizontal: paddingHorizontal || 0,
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ flex: 1 }, externalStyle]}
      keyboardVerticalOffset={0}
    >
      {withoutScroll ? (
        <View style={{ flex: 1 }}>{children}</View>
      ) : (
        <ScrollView
          style={[scrollStyle, { flex: 1 }]}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            contentContainerStyle,
            {
              minHeight: height,
              minWidth: width,
            },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
};

export default Block;
