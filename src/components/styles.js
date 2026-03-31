import { StyleSheet } from "react-native";
import { colors } from "../../assets/theme";

// ==========================
// 🔽 STYLE VERTICAL (LIST BAWAH)
// ==========================
export const stylesVertical = StyleSheet.create({
  listCard: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },

  cardItem: {
    flexDirection: "row",
    alignItems: "center", // ✅ biar sejajar tengah
    backgroundColor: colors.blue(0.05),
    borderRadius: 12,
    padding: 10,
  },

  cardImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,

    // 🔥 TAMBAHAN PENTING
    backgroundColor: "#ddd", // fallback kalau gambar gagal load
  },

  cardContent: {
    flex: 1,
    justifyContent: "center",
  },

  cardCategory: {
    color: colors.blue(),
    fontSize: 12,
    fontFamily: "Pjs-SemiBold",
    marginBottom: 2,
  },

  cardTitle: {
    fontSize: 14,
    fontFamily: "Pjs-Bold",
    color: colors.black(),
  },

  cardDesc: {
    fontSize: 12,
    color: "#777",
    fontFamily: "Pjs-Medium",
    marginTop: 2,
  },
});


// ==========================
// 🔽 STYLE HORIZONTAL (SLIDER ATAS)
// ==========================
export const stylesHorizontal = StyleSheet.create({
  cardItem: {
    width: 250,
    marginRight: 16,
  },

  cardImage: {
    width: "100%",
    height: 180,
    borderRadius: 12,

    // 🔥 TAMBAHAN
    backgroundColor: "#ccc", // biar ga kosong kalau gagal load
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  cardInfo: {
    maxWidth: "70%",
  },

  cardTitle: {
    color: colors.white(),
    fontSize: 14,
    fontFamily: "Pjs-Bold",
  },

  cardText: {
    color: colors.white(),
    fontSize: 12,
    fontFamily: "Pjs-Medium",
  },

  cardIcon: {
    backgroundColor: colors.white(0.3),
    padding: 6,
    borderRadius: 6,
  },
});