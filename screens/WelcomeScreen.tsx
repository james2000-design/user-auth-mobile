import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, FlatList } from "react-native";
import { getCommunityDetails } from "../util/service";
import { TwitterCommunityResponse } from "../models/twitter";

function WelcomeScreen() {
  const [community, setCommunity] = useState<null | TwitterCommunityResponse>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCommunity() {
      try {
        const data = await getCommunityDetails("1601841656147345410");
        setCommunity(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchCommunity();
  }, []);

  if (error) {
    return (
      <View style={styles.rootContainer}>
        <Text style={{ color: "red" }}>Error: {error}</Text>
      </View>
    );
  }

  if (!community) {
    return (
      <View style={styles.rootContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const details = community.result.result;

  return (
    <ScrollView contentContainerStyle={styles.rootContainer}>
      <View ><Text style={styles.title}>{details.name}</Text></View>
      <Text>{details.description}</Text>
      <Text>Members: {details.member_count}</Text>
      <Text>Topic: {details.primary_community_topic?.topic_name}</Text>

      {details.custom_banner_media && (
        <Image
          source={{ uri: details.custom_banner_media.media_info.original_img_url }}
          style={styles.banner}
        />
      )}

      <View style={styles.subtitletext}><Text style={styles.subtitle} >Rules:</Text></View>
      <FlatList
      data={details.rules}
      keyExtractor={(rule) => rule.id}
      renderItem={({ item }) => (
      <Text> {item.name}: {item.description}</Text>
      )}
/>
    </ScrollView>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 40,
    
    fontWeight: "bold",
    marginTop: 12,
  },
  subtitletext: {
    display: "flex",
    justifyContent: "center",
    fontSize: 20,
    width: "100%",           
  alignItems: "center",   
  marginVertical: 12,
    fontWeight: "bold",
    marginBottom: 12,
  },
  banner: {
    width: "100%",
    height: 200,
    marginVertical: 12,
    borderRadius: 8,
  },
});
