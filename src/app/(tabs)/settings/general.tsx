import { ScrollView, Text, View, Switch, Pressable, Modal, TouchableOpacity } from "react-native";
import { APP_COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

function SettingsRow({
  title,
  subtitle,
  icon,
  rightElement,
  onPress,
}: {
  title: string;
  subtitle?: string;
  icon: keyof typeof Ionicons.glyphMap;
  rightElement?: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 20,
        backgroundColor: APP_COLORS.offwhite,
        borderBottomWidth: 1,
        borderBottomColor: APP_COLORS["body-text-disabled"] + "20",
      }}
    >
      <Ionicons
        name={icon}
        size={20}
        color={APP_COLORS["body-text"]}
        style={{ marginRight: 16 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "500", color: APP_COLORS["body-text"] }}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ fontSize: 13, color: APP_COLORS["body-text-disabled"], marginTop: 2 }}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {rightElement}
    </Pressable>
  );
}

export default function GeneralSettings() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Theme
  const [theme, setTheme] = useState("system");
  const [themeModalVisible, setThemeModalVisible] = useState(false);

  // Language
  const [language, setLanguage] = useState("en");
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const themeOptions = [
    { label: "System", value: "system" },
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
  ];

  const languageOptions = [
    { label: "English", value: "en" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Spanish", value: "es" },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: APP_COLORS["primary-background"] }}>
      {/* Notifications toggle */}
      <SettingsRow
        title="Notifications"
        subtitle="Reminders and journaling check-ins"
        icon="notifications-outline"
        rightElement={
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
          />
        }
      />

      {/* Theme Row */}
      <SettingsRow
        title="Theme"
        subtitle="Light, dark, or system default"
        icon="color-palette-outline"
        rightElement={
          <Text style={{ color: APP_COLORS["body-text-disabled"] }}>
            {themeOptions.find((opt) => opt.value === theme)?.label}
          </Text>
        }
        onPress={() => setThemeModalVisible(true)}
      />

      {/* Language Row */}
      <SettingsRow
        title="Language"
        subtitle="Select your preferred language"
        icon="globe-outline"
        rightElement={
          <Text style={{ color: APP_COLORS["body-text-disabled"] }}>
            {languageOptions.find((opt) => opt.value === language)?.label}
          </Text>
        }
        onPress={() => setLanguageModalVisible(true)}
      />

      {/* Theme Modal */}
      <Modal transparent visible={themeModalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.7)" }}>
          <View style={{ backgroundColor: APP_COLORS.offwhite, borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 }}>
            {themeOptions.map((option) => {
              const selected = option.value === theme;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={{
                    padding: 16,
                    borderRadius: 999,
                    backgroundColor: selected ? APP_COLORS["primary"] + "20" : "transparent",
                    marginBottom: 4,
                  }}
                  onPress={() => {
                    setTheme(option.value);
                    setThemeModalVisible(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: selected ? APP_COLORS["primary"] : APP_COLORS["body-text"],
                      fontWeight: selected ? "700" : "400",
                    }}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity onPress={() => setThemeModalVisible(false)} style={{ padding: 16, alignItems: "center" }}>
              <Text style={{ color: APP_COLORS.error, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Language Modal */}
      <Modal transparent visible={languageModalVisible} animationType="slide">
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.7)" }}>
          <View style={{ backgroundColor: APP_COLORS.offwhite, borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 20 }}>
            {languageOptions.map((option) => {
              const selected = option.value === language;
              return (
                <TouchableOpacity
                  key={option.value}
                  style={{
                    padding: 16,
                    borderRadius: 999,
                    backgroundColor: selected ? APP_COLORS["primary"] + "20" : "transparent",
                    marginBottom: 4,
                  }}
                  onPress={() => {
                    setLanguage(option.value);
                    setLanguageModalVisible(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: selected ? APP_COLORS["primary"] : APP_COLORS["body-text"],
                      fontWeight: selected ? "700" : "400",
                    }}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity onPress={() => setLanguageModalVisible(false)} style={{ padding: 16, alignItems: "center" }}>
              <Text style={{ color: APP_COLORS.error, fontSize: 16 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}